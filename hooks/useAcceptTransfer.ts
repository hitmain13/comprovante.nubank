import { useState, useEffect, useCallback } from 'react'
import { ACCEPT_TRANSFER_LOADING_STEPS, LoadingStep } from '@/helpers/acceptTransferHelpers'
import { showConfettiEffect } from '@/helpers/showConfettiEffect'
import { useIsMobile } from './use-mobile'
import { toast } from '@/hooks/use-toast'
import { ApiClient } from '@/helpers/api/api-client'
import { usePathname } from 'next/navigation'

export type Geolocation = {
  latitude: number
  longitude: number
  accuracy: number
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  speed: number | null
}

export function useAcceptTransfer() {
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [transactionAccepted, setTransactionAccepted] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [fadeText, setFadeText] = useState(true)
  const [buttonText, setButtonText] = useState('Aceitar transferência')
  const [showPermissionNotification, setShowPermissionNotification] = useState(false)
  const isMobile = useIsMobile()
  const urlPath = usePathname()
  const hash = urlPath.split('/').pop()

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
      setTimeout(() => setShowToast(true), 200)
      updateButtonTextWithFade('Transferência aceita!', 500)
    })
  }, [executeLoadingSteps, updateButtonTextWithFade])

  // Quando há erro na obtenção da localização
  const handleLocationError = useCallback((error: GeolocationPositionError) => {
    setMessage(
      'Para aceitar a transferência, permita o acesso nas configurações do seu navegador e recarregue a página.'
    )
    setLoading(false)
    setFadeText(true)
    setButtonText('Aceitar transferência')
    console.error('Erro ao obter a localização:', error)
  }, [])

  // Obtém a geolocalização
  const getGeolocation = useCallback(async (): Promise<Geolocation> => {
    initializeLoadingUI()
    const geolocation = await new Promise(
      (resolve: (position: GeolocationPosition['coords']) => void, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            handleLocationSuccess()
            resolve(position.coords)
          },
          (error) => {
            handleLocationError(error)
            reject(error)
          }
        )
      }
    )
    return {
      latitude: geolocation.latitude,
      longitude: geolocation.longitude,
      accuracy: geolocation.accuracy,
      altitude: geolocation.altitude,
      altitudeAccuracy: geolocation.altitudeAccuracy,
      heading: geolocation.heading,
      speed: geolocation.speed,
    }
  }, [initializeLoadingUI, handleLocationSuccess, handleLocationError])

  const sendTransfer = useCallback(async () => {
    const geolocation = await getGeolocation()
    const apiClient = new ApiClient()
    console.log({ geolocation, hash })
    if (geolocation && hash) {
      await apiClient.sendTransfer(geolocation, hash)
    }
  }, [getGeolocation])

  // Handler do clique do botão
  const handleClick = useCallback(async () => {
    if (!navigator.permissions || !navigator.geolocation) {
      setMessage('Não foi possível validar a transferência. Por favor, tente novamente mais tarde.')
      return
    }
    const result = await navigator.permissions.query({ name: 'geolocation' })
    if (result.state === 'granted') {
      sendTransfer()
    } else if (result.state === 'prompt') {
      setMessage('Para aceitar, é necessário permitir a validação da transferência.')
      if (isMobile && !showPermissionNotification) {
        setShowPermissionNotification(true)
      }
      getGeolocation()
    } else if (result.state === 'denied') {
      setMessage(
        'Para aceitar a transferência, permita o acesso nas configurações do seu navegador e recarregue a página.'
      )
      toast({
        title: 'Permissão necessária',
        description:
          'Para aceitar a transferência, é necessário PERMITIR para a validação da transação.',
        variant: 'default',
      })
    }
  }, [getGeolocation, isMobile, showPermissionNotification])

  // Efeito para esconder o toast após um tempo
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 15000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  // Efeito para esconder a notificação de permissão após um tempo
  useEffect(() => {
    if (showPermissionNotification) {
      const timer = setTimeout(() => setShowPermissionNotification(false), 20000)
      return () => clearTimeout(timer)
    }
  }, [showPermissionNotification])

  // Efeito para disparar o confetti
  useEffect(() => {
    if (showToast) setTimeout(() => showConfettiEffect({}), 200)
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
