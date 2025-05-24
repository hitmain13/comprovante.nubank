'use client'

import { Button } from '@/components/ui/button'
import { AddIcon } from '@/icons'

export function AceitarTransferenciaButton() {
  function handleClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Localização obtida:', position)
        },
        (error) => {
          console.error('Erro ao obter localização:', error)
        }
      )
    } else {
      console.error('Geolocalização não suportada neste navegador.')
    }
  }

  return (
    <Button
      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center justify-center gap-2"
      onClick={handleClick}
    >
      Aceitar transferência
      <AddIcon />
    </Button>
  )
}
