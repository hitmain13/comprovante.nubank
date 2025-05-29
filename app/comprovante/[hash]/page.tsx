import Comprovante from '../page'
import { decodeReversibleHash } from '@/lib'
import { ApiClient } from '@/helpers/api/api-client'
import { NotFound } from '@/components/NotFound'

export default async function ComprovanteHashPage({ params }: { params: { hash: string } }) {
  const apiClient = new ApiClient()
  const hash = params?.hash

  try {
    const result = await apiClient.getHash(hash)
    if (!result.success) {
      return <NotFound />
    }

    if (result) {
      return <Comprovante searchParams={result.data} />
    }
  } catch (error) {
    console.error('Erro ao buscar hash na API:', error)
  }

  const decoded = decodeReversibleHash(hash)

  if (decoded) {
    return <Comprovante searchParams={decoded} />
  }

  return <NotFound />
}
