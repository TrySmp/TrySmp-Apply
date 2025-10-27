import { ApplicationInput } from '@/lib/types/application'

export function validateApplication(
  data: Partial<ApplicationInput>
): { valid: boolean; field?: keyof ApplicationInput; message?: string } {
  const required: (keyof ApplicationInput)[] = [
    'name',
    'discord_user_name',
    'discord_user_id',
    'minecraft_user',
    'info_age',
    'info_native_language',
    'info_language',
    'info_timezone',
    'question_why_apply_trysmp',
    'question_why_choose_you',
    'question_handle_feedback',
    'question_approach_tasks_teamwork',
    'question_bothers_network',
    'question_experience_in_teams',
    'question_desired_responsibility_areas',
    'question_expectations',
    'question_describe_yourself',
    'other_check_1',
    'other_check_2',
    'other_check_3',
  ]

  for (const key of required) {
    const value = data[key]
    if (value === undefined || value === '' || value === false) {
      return { valid: false, field: key, message: 'This field is required.' }
    }
  }

  if (data.discord_user_id && !/^\d{15,20}$/.test(data.discord_user_id)) {
    return { valid: false, field: 'discord_user_id', message: 'Invalid Discord ID format.' }
  }

  return { valid: true }
}
