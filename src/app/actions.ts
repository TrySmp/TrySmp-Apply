'use server'

import { db } from '@/lib/db'
import { applications } from '@/lib/schema'
import { ApplicationInput } from '@/lib/types/application'
import { validateApplication } from '@/lib/validation/validateApplication'

// Discord config
const DISCORD_API = 'https://discord.com/api/v10'
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID!

// Validate Discord user (exists + in TrySmp guild)
async function validateDiscordUser(discordId: string): Promise<boolean> {
  try {
    const userResp = await fetch(`${DISCORD_API}/users/${discordId}`, {
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` },
      cache: 'no-store',
    })
    if (!userResp.ok) return false

    const memberResp = await fetch(
      `${DISCORD_API}/guilds/${DISCORD_GUILD_ID}/members/${discordId}`,
      { headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }, cache: 'no-store' }
    )

    return memberResp.ok
  } catch (err) {
    console.error('Discord validation failed:', err)
    return false
  }
}

// Step-by-step validation
export async function validateStep(
  step: number,
  data: Record<string, string | boolean>
): Promise<{ valid: boolean; field?: keyof ApplicationInput; message?: string }> {
  // define which fields belong to which step
  const stepFields: Record<number, (keyof ApplicationInput)[]> = {
    2: [
      'name',
      'discord_user_name',
      'discord_user_id',
      'minecraft_user',
      'info_age',
      'info_timezone',
      'info_native_language',
      'info_language',
    ],
    3: [
      'question_why_apply_trysmp',
      'question_why_choose_you',
      'question_handle_feedback',
      'question_approach_tasks_teamwork',
      'question_bothers_network',
      'question_experience_in_teams',
      'question_desired_responsibility_areas',
      'question_expectations',
      'question_describe_yourself',
    ],
    4: ['other_check_1', 'other_check_2', 'other_check_3'],
  }

  const fields = stepFields[step]
  if (!fields) return { valid: true }

  // loop only over current step fields
  for (const key of fields) {
    const value = data[key]
    if (value === undefined || value === '' || value === false) {
      return { valid: false, field: key, message: 'This field is required.' }
    }

    // quick Discord ID format check (step 2 only)
    if (key === 'discord_user_id' && typeof value === 'string' && !/^\d{15,20}$/.test(value)) {
      return { valid: false, field: key, message: 'Invalid Discord ID format.' }
    }
  }

  return { valid: true }
}

export async function submitApplication(formData: FormData): Promise<{
  success: boolean
  message?: string
}> {
  try {
    const raw = Object.fromEntries(formData.entries())

    const parsed: ApplicationInput = {
      uuid: crypto.randomUUID(),
      name: String(raw.name ?? ''),
      discord_user_name: String(raw.discord_user_name ?? ''),
      discord_user_id: String(raw.discord_user_id ?? ''),
      minecraft_user: String(raw.minecraft_user ?? ''),
      info_age: String(raw.info_age ?? ''),
      info_native_language: String(raw.info_native_language ?? ''),
      info_language: String(raw.info_language ?? ''),
      info_timezone: String(raw.info_timezone ?? ''),
      question_why_apply_trysmp: String(raw.question_why_apply_trysmp ?? ''),
      question_why_choose_you: String(raw.question_why_choose_you ?? ''),
      question_handle_feedback: String(raw.question_handle_feedback ?? ''),
      question_approach_tasks_teamwork: String(raw.question_approach_tasks_teamwork ?? ''),
      question_bothers_network: String(raw.question_bothers_network ?? ''),
      question_experience_in_teams: String(raw.question_experience_in_teams ?? ''),
      question_desired_responsibility_areas: String(raw.question_desired_responsibility_areas ?? ''),
      question_expectations: String(raw.question_expectations ?? ''),
      question_describe_yourself: String(raw.question_describe_yourself ?? ''),
      other_infos: raw.other_infos ? String(raw.other_infos) : undefined,
      other_questions: raw.other_questions ? String(raw.other_questions) : undefined,
      other_check_1: raw.other_check_1 === 'true' || raw.other_check_1 === 'on',
      other_check_2: raw.other_check_2 === 'true' || raw.other_check_2 === 'on',
      other_check_3: raw.other_check_3 === 'true' || raw.other_check_3 === 'on',
    }

    // Step 1: Local validation
    const check = validateApplication(parsed)
    if (!check.valid) return { success: false, message: check.message }

    // Step 2: Discord verification
    const discordOk = await validateDiscordUser(parsed.discord_user_id)
    if (!discordOk) {
      return { success: false, message: 'Discord user not found or not in TrySmp server.' }
    }

    // Step 3: Write to DB
    await db.insert(applications).values({
      ...parsed,
      status: 'pending',
      notes: '',
      created_at_ms: Date.now(),
    })

    return { success: true }
  } catch (error) {
    console.error('Submit error:', error)
    return { success: false, message: 'Unknown server error.' }
  }
}
