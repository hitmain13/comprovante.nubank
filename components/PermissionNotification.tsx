import React from 'react'

export function PermissionNotification() {
  return (
    <div className="fixed top-4 left-1/2 w-full -translate-x-1/2 z-50 px-4 py-2 flex items-center gap-2 rounded-xl shadow-lg bg-purple-700 text-white text-sm animate-fade-in-out max-w-xs">
      <svg
        className="w-12 h-12 text-white opacity-80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <span>
        Para aceitar a transferência, é necessário PERMITIR para a validação da transação.
      </span>
    </div>
  )
}
