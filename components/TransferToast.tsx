import React from 'react'

export function TransferToast() {
  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 flex flex-col items-center gap-2 rounded-2xl shadow-xl backdrop-blur-md bg-white/80 border border-gray-200 animate-fade-in-out"
      style={{ minWidth: 260 }}
    >
      <span className="flex items-center justify-center gap-2 mb-0.5">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500">
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
        <span className="text-base text-gray-900">Transfer accepted!</span>
      </span>
      <span className="text-xs text-gray-700 text-center leading-snug">
        In a few minutes the amount will be in your account
      </span>
    </div>
  )
}
