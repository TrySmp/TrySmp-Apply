import {
  mysqlTable,
  serial,
  varchar,
  text,
  boolean,
  bigint,
} from 'drizzle-orm/mysql-core'

export const applications = mysqlTable('applications', {
  id: serial('id').primaryKey(),

  // --- Basic applicant info ---
  uuid: varchar('uuid', { length: 64 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  discord_user_name: varchar('discord_user_name', { length: 100 }).notNull(),
  discord_user_id: varchar('discord_user_id', { length: 32 }).notNull(),
  minecraft_user: varchar('minecraft_user', { length: 100 }).notNull(),
  info_age: varchar('info_age', { length: 10 }).notNull(),
  info_native_language: varchar('info_native_language', { length: 100 }).notNull(),
  info_language: varchar('info_language', { length: 100 }).notNull(),
  info_timezone: varchar('info_timezone', { length: 100 }).notNull(),

  // --- Application questions ---
  question_why_apply_trysmp: text('question_why_apply_trysmp').notNull(),
  question_why_choose_you: text('question_why_choose_you').notNull(),
  question_handle_feedback: text('question_handle_feedback').notNull(),
  question_approach_tasks_teamwork: text('question_approach_tasks_teamwork').notNull(),
  question_bothers_network: text('question_bothers_network').notNull(),
  question_experience_in_teams: text('question_experience_in_teams').notNull(),
  question_desired_responsibility_areas: text('question_desired_responsibility_areas').notNull(),
  question_expectations: text('question_expectations').notNull(),
  question_describe_yourself: text('question_describe_yourself').notNull(),

  // --- Other ---
  other_infos: text('other_infos'),
  other_questions: text('other_questions'),
  other_check_1: boolean('other_check_1').notNull().default(false),
  other_check_2: boolean('other_check_2').notNull().default(false),
  other_check_3: boolean('other_check_3').notNull().default(false),

  // --- Moderation / staff fields ---
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending | accepted | rejected | under_review
  notes: text('notes').default(''), // staff notes / feedback
  created_at_ms: bigint('created_at_ms', { mode: 'number' }).notNull(), // timestamp in ms
})
