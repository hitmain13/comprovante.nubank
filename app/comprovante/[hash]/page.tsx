import Comprovante from '../page'
import { decodeReversibleHash } from '@/lib'
import { ApiClient } from '@/helpers/api/api-client'
import { NotFound } from '@/components/NotFound'

export default async function ComprovanteHashPage({ params }: { params: { hash: string } }) {
  const apiClient = new ApiClient()
  const hash = params?.hash

  // 1. Tenta buscar no banco persistido (API)
  try {
    const result = await apiClient.getHash(hash)

    if (result) {
      return <Comprovante searchParams={result} />
    }
  } catch (error) {
    console.error('Erro ao buscar hash na API:', error)
  }

  // 2. Fallback: tenta decodificar reversivelmente (local)
  const decoded = decodeReversibleHash(hash)

  if (decoded) {
    return <Comprovante searchParams={decoded} />
  }

  // 3. Fallback final: erro amigável ao usuário
  return <NotFound />
}
