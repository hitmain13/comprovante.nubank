import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'

export interface ComprovanteData {
  valor: string
  pixKey: string
  horario: string
  origemNome: string
  origemInstituicao: string
  origemAgencia: string
  origemConta: string
  origemCpf: string
  destinoNome: string
  destinoInstituicao: string
  destinoAgencia: string
  destinoConta: string
  destinoCpf: string
  transacaoId: string
  [key: string]: any
}

export function useComprovante(hash: string | null) {
  const [data, setData] = useState<ComprovanteData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!hash) return
    setLoading(true)
    setError(null)
    apiFetch<ComprovanteData>(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/comprovante/${hash}`
    )
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [hash])

  return { data, loading, error }
}
