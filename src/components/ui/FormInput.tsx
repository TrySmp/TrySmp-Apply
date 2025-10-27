'use client'

import { ChangeEvent } from 'react'

interface FormInputProps {
  label: string
  name: string
  value: string
  placeholder?: string
  type?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  className?: string
}

export function FormInput({
                            label,
                            name,
                            value,
                            placeholder,
                            type = 'text',
                            onChange,
                            error,
                            className = '',
                          }: FormInputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="mb-2 text-gray-200 font-medium tracking-wide">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl px-4 py-3 bg-gray-900/60 border text-gray-100 placeholder-gray-500 transition-all duration-300
        ${
          error
            ? 'border-red-500 focus:border-red-400 shadow-[0_0_12px_#ef4444]/40'
            : 'border-gray-700 focus:border-blue-500 focus:shadow-[0_0_12px_#3b82f6]/30'
        }
        focus:outline-none backdrop-blur-sm`}
      />
      {error && <p className="text-red-500 text-sm mt-1 animate-fadeIn">{error}</p>}
    </div>
  )
}
