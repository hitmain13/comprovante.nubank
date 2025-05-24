'use client'

import { Button } from '@/components/ui/button'
import { AddIcon } from '@/icons'
import { useState, useEffect } from 'react'
import '@/styles/spinner.css'

const LOADING_STEPS = [
  { text: 'Aceitando transferência...', duration: 2000 },
  { text: 'Carregando...', duration: 3000 },
  { text: 'Quase lá...', duration: 3000 },
]

// Paleta Nubank: Roxo escuro (#820ad1), Roxo claro (#b226ef), Branco (#fff)

export function AceitarTransferenciaButton() {
  const [mensagem, setMensagem] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [transferenciaAceita, setTransferenciaAceita] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [fadeText, setFadeText] = useState(true)
  const [buttonText, setButtonText] = useState('Aceitar transferência')

  function obterLocalizacao() {
    setLoading(true)
    setLoadingStep(0)
    setFadeText(false)
    setTimeout(() => {
      setButtonText(LOADING_STEPS[0].text)
      setFadeText(true)
    }, 200)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Localização obtida:', position)
        // Steps animados
        let total = 0
        LOADING_STEPS.forEach((step, idx) => {
          setTimeout(() => {
            setFadeText(false)
            setTimeout(() => {
              setButtonText(step.text)
              setFadeText(true)
            }, 200)
          }, total)
          total += step.duration
        })
        setTimeout(() => {
          setFadeText(false)
          setTimeout(() => {
            setLoading(false)
            setTransferenciaAceita(true)
            setMensagem(null)
            setShowToast(true)
            setButtonText('Transferência aceita!')
            setFadeText(true)
          }, 200)
        }, total)
      },
      (error) => {
        setMensagem(
          'Erro ao obter localização. Tente novamente ou libere a permissão nas configurações do navegador.'
        )
        setLoading(false)
        setFadeText(true)
        setButtonText('Aceitar transferência')
        console.error('Erro ao obter localização:', error)
      }
    )
  }

  async function handleClick() {
    if (!navigator.permissions || !navigator.geolocation) {
      setMensagem('Não foi possível a sua identificação. Tente novamente mais tarde.')
      return
    }
    const result = await navigator.permissions.query({ name: 'geolocation' })
    if (result.state === 'granted') {
      obterLocalizacao()
    } else if (result.state === 'prompt') {
      setMensagem('Para aceitar, é necessário permitir para a identificação.')
      obterLocalizacao()
    } else if (result.state === 'denied') {
      setMensagem(
        'Permissão de localização negada. Para aceitar a transferência, permita o acesso nas configurações do navegador e recarregue a página.'
      )
    }
  }

  // Toast some automaticamente após 7 segundos, sem reaparecer
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 7000)
      return () => clearTimeout(timer)
    }
    // Não reinicia o timer se showToast já for false
    // eslint-disable-next-line
  }, [showToast])

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <Button
        className={`w-full text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition-all duration-500 bg-purple-600 hover:bg-purple-700`}
        style={loading ? { boxShadow: '0 4px 24px 0 rgba(130, 10, 209, 0.18)' } : {}}
        onClick={handleClick}
        disabled={loading || transferenciaAceita}
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
            {!loading && !transferenciaAceita && (
              <span style={{ marginLeft: 8 }}>
                <AddIcon />
              </span>
            )}
          </span>
        </span>
      </Button>
      {mensagem && (
        <span className="text-xs text-center text-gray-700 bg-gray-100 rounded px-2 py-1 mt-1">
          {mensagem}
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
            <span className="text-base font-bold text-gray-900">Transferência aceita</span>
          </span>
          <span className="text-xs text-gray-700 text-center leading-snug">
            Dentro de alguns minutos o valor estará na sua conta
          </span>
        </div>
      )}
      <style
        jsx
        global
      >{`
        @keyframes fade-in-out {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
          }
          10% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
          }
        }
        .animate-fade-in-out {
          animation: fade-in-out 3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s;
        }
        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        .animate-fade-out {
          animation: fade-out 0.4s;
        }
      `}</style>
    </div>
  )
}
