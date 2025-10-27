export interface ApplicationInput {
  uuid: string
  name: string
  discord_user_name: string
  discord_user_id: string
  minecraft_user: string
  info_age: string
  info_native_language: string
  info_language: string
  info_timezone: string

  question_why_apply_trysmp: string
  question_why_choose_you: string
  question_handle_feedback: string
  question_approach_tasks_teamwork: string
  question_bothers_network: string
  question_experience_in_teams: string
  question_desired_responsibility_areas: string
  question_expectations: string
  question_describe_yourself: string

  other_infos?: string
  other_questions?: string
  other_check_1: boolean
  other_check_2: boolean
  other_check_3: boolean
}
