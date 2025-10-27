'use client'

import { ChangeEvent } from 'react'
import { FormInput } from '@/components/ui/FormInput'

interface StepProps {
  data: Record<string, string | boolean>
  update: (key: string, value: string | boolean) => void
  errors: Record<string, string>
}

export default function StepPersonal({ data, update, errors }: StepProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    update(name, value)
  }

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-semibold text-center mb-8">Personal Information</h2>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormInput
          label="Full Name"
          name="name"
          placeholder="John Doe"
          value={String(data.name || '')}
          onChange={handleChange}
          error={errors.name}
        />

        <FormInput
          label="Age"
          name="info_age"
          placeholder="16"
          type="number"
          value={String(data.info_age || '')}
          onChange={handleChange}
          error={errors.info_age}
        />

        <FormInput
          label="Discord Username"
          name="discord_user_name"
          placeholder="Example#0001"
          value={String(data.discord_user_name || '')}
          onChange={handleChange}
          error={errors.discord_user_name}
        />

        <FormInput
          label="Discord User ID"
          name="discord_user_id"
          placeholder="123456789012345678"
          value={String(data.discord_user_id || '')}
          onChange={handleChange}
          error={errors.discord_user_id}
        />
      </div>

      {/* Single line fields below */}
      <div className="flex flex-col gap-6">
        <FormInput
          label="Minecraft Username"
          name="minecraft_user"
          placeholder="Notch"
          value={String(data.minecraft_user || '')}
          onChange={handleChange}
          error={errors.minecraft_user}
        />

        <FormInput
          label="Timezone"
          name="info_timezone"
          placeholder="e.g. GMT+1 / CET"
          value={String(data.info_timezone || '')}
          onChange={handleChange}
          error={errors.info_timezone}
        />

        <FormInput
          label="Native Language"
          name="info_native_language"
          placeholder="English"
          value={String(data.info_native_language || '')}
          onChange={handleChange}
          error={errors.info_native_language}
        />

        <FormInput
          label="Other Languages"
          name="info_language"
          placeholder="German, Spanish..."
          value={String(data.info_language || '')}
          onChange={handleChange}
          error={errors.info_language}
        />
      </div>
    </div>
  )
}
