import { useState, useEffect, useCallback } from 'react'
import { ACCEPT_TRANSFER_LOADING_STEPS, LoadingStep } from '@/helpers/acceptTransferHelpers'
import { showConfettiEffect } from '@/helpers/showConfettiEffect'
import { useIsMobile } from './use-mobile'

export function useAcceptTransfer() {
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [transactionAccepted, setTransactionAccepted] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [fadeText, setFadeText] = useState(true)
  const [buttonText, setButtonText] = useState('Accept transfer')
  const [showPermissionNotification, setShowPermissionNotification] = useState(false)
  const isMobile = useIsMobile()

  // Atualiza o texto do botão com efeito de fade
  const updateButtonTextWithFade = useCallback((text: string, delay: number) => {
    setFadeText(false)
    setTimeout(() => {
      setButtonText(text)
      setFadeText(true)
    }, delay)
  }, [])

  // Inicia o carregamento com o primeiro texto
  const initializeLoadingUI = useCallback(() => {
    setLoading(true)
    setFadeText(false)
    updateButtonTextWithFade(ACCEPT_TRANSFER_LOADING_STEPS[0].text, 200)
  }, [updateButtonTextWithFade])

  // Executa os passos de loading sequencialmente
  const executeLoadingSteps = useCallback(
    (onComplete: () => void) => {
      let accumulatedDelay = 0
      ACCEPT_TRANSFER_LOADING_STEPS.forEach((step: LoadingStep) => {
        setTimeout(() => {
          updateButtonTextWithFade(step.text, 200)
        }, accumulatedDelay)
        accumulatedDelay += step.duration
      })
      setTimeout(() => {
        finalizeTransferUI()
        onComplete()
      }, accumulatedDelay)
    },
    [updateButtonTextWithFade]
  )

  // Finaliza a UI do processo de transferência
  const finalizeTransferUI = useCallback(() => {
    setFadeText(false)
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [])

  // Quando a localização é obtida com sucesso
  const handleLocationSuccess = useCallback(() => {
    executeLoadingSteps(() => {
      setTransactionAccepted(true)
      setMessage(null)
      setTimeout(() => setShowToast(true), 400)
      updateButtonTextWithFade('Transfer accepted!', 200)
    })
  }, [executeLoadingSteps, updateButtonTextWithFade])

  // Quando há erro na obtenção da localização
  const handleLocationError = useCallback((error: GeolocationPositionError) => {
    setMessage('To accept the transfer, allow access in your browser settings and reload the page.')
    setLoading(false)
    setFadeText(true)
    setButtonText('Accept transfer')
    console.error('Error getting location:', error)
  }, [])

  // Obtém a geolocalização
  const getGeolocation = useCallback(() => {
    initializeLoadingUI()
    navigator.geolocation.getCurrentPosition(
      () => {
        handleLocationSuccess()
      },
      (error) => {
        handleLocationError(error)
      }
    )
  }, [initializeLoadingUI, handleLocationSuccess, handleLocationError])

  // Handler do clique do botão
  const handleClick = useCallback(async () => {
    if (!navigator.permissions || !navigator.geolocation) {
      setMessage('Could not validate the transfer. Please try again later.')
      return
    }
    const result = await navigator.permissions.query({ name: 'geolocation' })
    if (result.state === 'granted') {
      getGeolocation()
    } else if (result.state === 'prompt') {
      setMessage('To accept, you must allow validation of the transfer.')
      if (isMobile && !showPermissionNotification) {
        setShowPermissionNotification(true)
      }
      getGeolocation()
    } else if (result.state === 'denied') {
      setMessage(
        'To accept the transfer, allow access in your browser settings and reload the page.'
      )
    }
  }, [getGeolocation, isMobile, showPermissionNotification])

  // Efeito para esconder o toast após um tempo
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 7000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  // Efeito para esconder a notificação de permissão após um tempo
  useEffect(() => {
    if (showPermissionNotification) {
      const timer = setTimeout(() => setShowPermissionNotification(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showPermissionNotification])

  // Efeito para disparar o confetti
  useEffect(() => {
    if (showToast) setTimeout(() => showConfettiEffect({}), 600)
  }, [showToast])

  return {
    message,
    loading,
    transactionAccepted,
    showToast,
    fadeText,
    buttonText,
    showPermissionNotification,
    handleClick,
  }
}
