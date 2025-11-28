'use client'

import { useState } from 'react'
import StepPersonal from '@/components/StepPersonal'
import StepQuestions from '@/components/StepQuestions'
import StepOther from '@/components/StepOther'
import {submitApplication, validateStep} from "@/app/actions";

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<Record<string, string | boolean>>({})

  const next = async () => {
    // validate before moving to next step
    const res = await validateStep(step, formData)
    if (!res.valid) {
      setErrors({ [res.field!]: res.message! })
      return
    }

    setErrors({})

    // on final step → submit
    if (step === 4) {
      setLoading(true)
      const minDelay = new Promise((res) => setTimeout(res, 3000))

      const fd = new FormData()
      for (const [key, value] of Object.entries(formData)) {
        fd.append(key, String(value))
      }

      const result = await submitApplication(fd)
      await minDelay
      setLoading(false)

      if (!result.success) {
        setErrors({ submit: result.message ?? 'Unknown error' })
        return
      }

      setStep(5)
      return
    }

    setStep((s) => Math.min(5, s + 1))
  }

  const back = () => setStep((s) => Math.max(1, s - 1))

  // data updater from child components
  const updateForm = (key: string, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [key]: value }))

  return (
    <main className="flex flex-col items-center py-16 px-6 overflow-hidden relative">
      <div
        className={`w-full max-w-3xl space-y-16 transition-all duration-700 ${
          loading ? 'opacity-50 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* --- STEP 1 --- */}
        {step === 1 && (
          <section className="space-y-8 text-gray-200 animate-fadeSlideIn">
            <h1 className="text-4xl font-bold text-center">TrySmp Application 👋</h1>

            <p className="leading-relaxed text-gray-400">
              We&apos;re excited that you&apos;re interested in working with us.
            </p>

            <p className="leading-relaxed text-gray-400">
              First, here are a few basic requirements for all applicants:
            </p>

            <ul className="list-disc list-inside text-gray-400 space-y-1 pl-2">
              <li>Minimum age of 15 years</li>
              <li>A premium Minecraft account (no Bedrock or cracked versions)</li>
              <li>A functional, high-quality microphone</li>
              <li>A PC capable of recording</li>
              <li>Proficiency in both written and spoken English</li>
              <li>Willingness to invest several hours a day into the project</li>
            </ul>

            <p className="leading-relaxed text-gray-400">
              Please note that any application filled out half-heartedly will be rejected immediately.
              So take your time and make sure to complete everything as thoroughly as possible.
              We prefer English for all applications. The process may take up to 14 days.
              If we are interested in collaborating with you, we will reach out to you via Discord.
            </p>

            <p className="leading-relaxed text-gray-400">
              Also, please ensure that the Discord account you apply with is already part of our{' '}
              <a
                href="https://discord.gg/trysmp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline decoration-blue-500"
              >
                Discord server
              </a>
              ! This is necessary to verify that the account you provide exists and to allow us to contact you directly.
            </p>

            <div className="flex justify-center pt-8">
              <button
                onClick={next}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium text-lg transition-all shadow-md hover:shadow-blue-500/30"
              >
                Start Application
              </button>
            </div>
          </section>
        )}

        {/* --- STEP 2 --- */}
        {step === 2 && (
          <section className="animate-fadeSlideIn">
            <StepPersonal data={formData} update={updateForm} errors={errors} />
            <NavButtons back={back} next={next} />
          </section>
        )}

        {/* --- STEP 3 --- */}
        {step === 3 && (
          <section className="animate-fadeSlideIn">
            <StepQuestions data={formData} update={updateForm} errors={errors} />
            <NavButtons back={back} next={next} />
          </section>
        )}

        {/* --- STEP 4 --- */}
        {step === 4 && (
          <section className="animate-fadeSlideIn">
            <StepOther data={formData} update={updateForm} errors={errors} />
            <NavButtons back={back} next={next} nextLabel="Submit" />
          </section>
        )}

        {/* --- STEP 5 (Success) --- */}
        {step === 5 && (
          <section
            className="flex flex-col items-center justify-center text-center animate-fadeSlideIn space-y-8"
            style={{ minHeight: 'calc(100vh - 8rem)' }}
          >
            <div className="flex justify-center">
              <svg
                viewBox="0 0 52 52"
                className="w-32 h-32 text-green-500 stroke-current animate-popIn overflow-visible"
                fill="none"
              >
                <circle cx="26" cy="26" r="25" strokeWidth="3" />
                <path d="M14 27 l8 8 l16 -16" strokeWidth="3" />
              </svg>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-semibold">Application submitted successfully</h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
                We&apos;ll reach out via Discord if everything looks good.<br />
                Thanks for applying at <span className="text-green-400 font-semibold">TrySmp</span> 💚
              </p>
            </div>
          </section>
        )}
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn z-50">
          <div className="flex flex-col items-center gap-6">
            <div className="neon-loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className="text-gray-300 text-lg font-medium tracking-wide animate-pulse">
              Submitting your application...
            </p>
          </div>
        </div>
      )}
    </main>
  )
}

function NavButtons({
                      back,
                      next,
                      nextLabel = 'Next',
                    }: {
  back: () => void
  next: () => void
  nextLabel?: string
}) {
  return (
    <div className="flex justify-between pt-10">
      <button
        onClick={back}
        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all"
      >
        Back
      </button>
      <button
        onClick={next}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-all shadow-md hover:shadow-blue-500/30"
      >
        {nextLabel}
      </button>
    </div>
  )
}
