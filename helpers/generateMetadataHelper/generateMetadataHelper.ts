import { Metadata } from 'next/types'
import { getTransactionProps } from '../getTransactionProps'
import { getFirstName } from '../getFirstName'
import { decodeReversibleHash } from '@/lib'
import { ApiClient } from '../api/api-client'
import { convertToSearchParams } from '../convertToSearchParams'

export type GenerateMetadataProps = {
  searchParams: Record<string, string>
  params?: { hash?: string }
}

export async function generateMetadataHelper(props: GenerateMetadataProps): Promise<Metadata> {
  const hash = (await props?.params?.hash) || (await props?.searchParams?.hash)
  let searchParams: Record<string, string> | undefined

  if (hash) {
    const apiClient = new ApiClient()
    const data = await apiClient.getHash(hash)
    if (data) searchParams = convertToSearchParams(data)
  }
  if (hash) {
    const decoded = decodeReversibleHash(hash)
    if (decoded) searchParams = decoded
  }
  return mountMetadata({ searchParams: searchParams || props.searchParams })
}

async function mountMetadata({ searchParams }: GenerateMetadataProps): Promise<Metadata> {
  console.log('searchParams', await searchParams)
  if (!searchParams || Object.keys(searchParams).length === 0)
    return {
      title: 'Transferência não encontrada',
      description: 'A transferência não foi encontrada.',
      generator: 'Matsu.dev',
    }
  const props = getTransactionProps(searchParams, searchParams)
  const firstName = getFirstName(props.origemNome)

  return {
    title: `${firstName} está enviando uma transferência para você!`,
    description:
      'Tap to Pay | Nubank - Faça transações e pagamentos de forma rápida e eficiente 24 horas por dia pela Nubank.',
    generator: 'Matsu.dev',
    openGraph: {
      images: [
        {
          url: 'https://www.mundorh.com.br/wp-content/uploads/2021/05/Novo-Logo-002.jpg',
          width: 1200,
          height: 630,
          alt: 'Nubank',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [
        {
          url: 'https://www.mundorh.com.br/wp-content/uploads/2021/05/Novo-Logo-002.jpg',
          alt: 'Nubank',
        },
      ],
    },
  }
}
