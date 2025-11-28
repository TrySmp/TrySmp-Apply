'use client'

export default function Maintenance() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative animate-fadeSlideIn">

      {/* Icon */}
      <div className="mb-10 animate-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-32 w-32 text-yellow-400 drop-shadow-[0_0_20px_rgba(255,200,0,0.5)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>

      {/* Text */}
      <div className="text-center space-y-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-yellow-300 animate-glow">
          This page is currently under maintenance
        </h1>

        <p className="text-gray-400 max-w-xl leading-relaxed animate-fadeInSlow">
          We are currently applying some updates to the website<br />
          Will be back shortly &lt;3
        </p>
      </div>

      {/* Loader */}
      <div className="mt-10 flex gap-3">
        <span className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
        <span className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
        <span className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
      </div>

    </main>
  )
}
