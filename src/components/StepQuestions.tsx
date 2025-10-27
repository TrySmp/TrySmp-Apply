'use client'

import { ChangeEvent } from 'react'
import { FormTextarea } from '@/components/ui/FormTextarea'

interface StepProps {
  data: Record<string, string | boolean>
  update: (key: string, value: string | boolean) => void
  errors: Record<string, string>
}

export default function StepQuestions({ data, update, errors }: StepProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    update(name, value)
  }

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-semibold text-center mb-8">Application Questions</h2>

      {questions.map((q) => (
        <FormTextarea
          key={q.name}
          label={q.label}
          name={q.name}
          placeholder={q.placeholder}
          value={String(data[q.name] || '')}
          onChange={handleChange}
          error={errors[q.name]}
          rows={4}
        />
      ))}
    </div>
  )
}

const questions = [
  {
    label: 'Why do you want to apply for TrySmp?',
    name: 'question_why_apply_trysmp',
    placeholder: 'Tell us why you want to join the TrySmp team...',
  },
  {
    label: 'Why should we choose you?',
    name: 'question_why_choose_you',
    placeholder: 'Explain what makes you the right fit...',
  },
  {
    label: 'How do you handle feedback or criticism?',
    name: 'question_handle_feedback',
    placeholder: 'Describe how you react to constructive feedback...',
  },
  {
    label: 'How do you approach tasks and teamwork?',
    name: 'question_approach_tasks_teamwork',
    placeholder: 'Tell us about your collaboration style...',
  },
  {
    label: 'What bothers you most in a network or team?',
    name: 'question_bothers_network',
    placeholder: 'Be honest — what makes teamwork difficult for you?',
  },
  {
    label: 'What is your experience in teams or projects?',
    name: 'question_experience_in_teams',
    placeholder: 'Describe previous experience with similar teams...',
  },
  {
    label: 'Which responsibility areas would you like to work in?',
    name: 'question_desired_responsibility_areas',
    placeholder: 'Moderation, Management, Events, etc...',
  },
  {
    label: 'What do you expect from TrySmp?',
    name: 'question_expectations',
    placeholder: 'Tell us what you expect from the team and environment...',
  },
  {
    label: 'How would you describe yourself?',
    name: 'question_describe_yourself',
    placeholder: 'Write a short self-description (personality, strengths...)',
  },
]
