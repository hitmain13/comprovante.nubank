'use client'

import { Button } from '@/components/ui/button'
import { AddIcon } from '@/icons'
import { useAcceptTransfer } from '@/hooks/useAcceptTransfer'
import { PermissionNotification } from './PermissionNotification'
import { TransferToast } from './TransferToast'
import '@/styles/spinner.css'
import '@/styles/animations.css'

export function AcceptTransferButton() {
  const {
    message,
    loading,
    transactionAccepted,
    showToast,
    fadeText,
    buttonText,
    showPermissionNotification,
    handleClick,
  } = useAcceptTransfer()

  return (
    <div className="w-full flex flex-col items-center gap-2">
      {showPermissionNotification && <PermissionNotification />}
      <Button
        className={`w-full text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition-all duration-500 bg-purple-600 hover:bg-purple-700`}
        style={loading ? { boxShadow: '0 4px 24px 0 rgba(130, 10, 209, 0.18)' } : {}}
        onClick={handleClick}
        disabled={loading || transactionAccepted}
      >
        <span className={`flex items-center gap-2 transition-all duration-500 h-7`}>
          {loading && <div className="spinner w-6 h-6 animate-spinner" />}
          <span
            className={`transition-opacity duration-400 flex items-center ${
              fadeText ? 'opacity-100 animate-fade-in' : 'opacity-0 animate-fade-out'
            }`}
            key={buttonText}
          >
            {buttonText}
            {!loading && !transactionAccepted && (
              <span style={{ marginLeft: 8 }}>
                <AddIcon />
              </span>
            )}
          </span>
        </span>
      </Button>
      {message && (
        <span className="text-xs text-center text-gray-700 bg-gray-100 rounded px-2 py-1 mt-1">
          {message}
        </span>
      )}
      {showToast && <TransferToast />}
    </div>
  )
}
