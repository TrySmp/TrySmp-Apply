'use client'

import {ChangeEvent, ReactNode} from 'react'
import { FormTextarea } from '@/components/ui/FormTextarea'

interface StepProps {
  data: Record<string, string | boolean>
  update: (key: string, value: string | boolean) => void
  errors: Record<string, string>
}

export default function StepOther({ data, update, errors }: StepProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    update(name, value)
  }

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    update(name, checked)
  }

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-semibold text-center mb-8">Other Information</h2>

      <FormTextarea
        label="Anything else we should know? (optional)"
        name="other_infos"
        placeholder="Additional notes, context, or special information..."
        value={String(data.other_infos || '')}
        onChange={handleChange}
        error={errors.other_infos}
        rows={3}
      />

      <FormTextarea
        label="Any questions for us? (optional)"
        name="other_questions"
        placeholder="If you have any questions, write them here..."
        value={String(data.other_questions || '')}
        onChange={handleChange}
        error={errors.other_questions}
        rows={3}
      />

      <div className="space-y-5 pt-6">
        {checks.map((c) => (
          <CheckField
            key={c.name}
            label={c.label}
            name={c.name}
            checked={Boolean(data[c.name])}
            onChange={handleCheck}
            error={errors[c.name]}
          />
        ))}
      </div>
    </div>
  )
}

const checks = [
  {
    name: 'other_check_1',
    label: (
      <>
        I agree that my personal data provided in this application may, under certain circumstances,
        be shared with third parties. Furthermore, I accept the{' '}
        <a
          href="https://allay-studios.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline decoration-blue-500"
        >
          Privacy Policy
        </a>{' '}
        and consent to its terms.
      </>
    ),
  },
  {
    name: 'other_check_2',
    label:
      'I understand that my application will be automatically rejected if I inquire about its review status or attempt to influence the decision-making process.',
  },
  {
    name: 'other_check_3',
    label:
      'I confirm that all information provided in this form is accurate and truthful. I acknowledge that providing false information may result in a permanent ban and exclusion from future applications.',
  },
]

interface CheckProps {
  label: ReactNode
  name: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
}

function CheckField({ label, name, checked, onChange, error }: CheckProps) {
  return (
    <div className="flex flex-col">
      <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className={`w-5 h-5 accent-blue-600 rounded border-2 transition-all ${
            error ? 'border-red-500' : 'border-gray-600'
          }`}
        />
        <span>{label}</span>
      </label>
      {error && <p className="text-red-500 text-sm mt-1 animate-fadeIn">{error}</p>}
    </div>
  )
}
