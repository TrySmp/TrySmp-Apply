'use client'

import { ChangeEvent } from 'react'

interface FormTextareaProps {
  label: string
  name: string
  value: string
  placeholder?: string
  rows?: number
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
  className?: string
}

export function FormTextarea({
                               label,
                               name,
                               value,
                               placeholder,
                               rows = 4,
                               onChange,
                               error,
                               className = '',
                             }: FormTextareaProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="mb-2 text-gray-200 font-medium tracking-wide">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full rounded-xl px-4 py-3 bg-gray-900/60 border text-gray-100 placeholder-gray-500 resize-none transition-all duration-300
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
