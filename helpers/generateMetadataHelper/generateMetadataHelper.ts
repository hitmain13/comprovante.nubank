import { Metadata } from 'next/types'
import { fetchTransaction } from '../fetchTransaction'
import { getTransactionProps } from '../getTransactionProps'
import { getFirstName } from '../getFirstName'
import { decodeReversibleHash, hashDB } from '@/lib'

export type GenerateMetadataProps = {
  searchParams: Record<string, string>
  params?: { hash?: string }
}

export async function generateMetadataHelper(props: GenerateMetadataProps): Promise<Metadata> {
  const hash = props?.params?.hash || props?.searchParams?.hash
  let searchParams: Record<string, string> | undefined

  if (hash && hashDB[hash]) {
    searchParams = hashDB[hash]
  } else if (hash) {
    const decoded = decodeReversibleHash(hash)
    if (decoded) {
      searchParams = decoded
    }
  }
  return mountMetadata({ searchParams: searchParams || props.searchParams })
}

async function mountMetadata({ searchParams }: GenerateMetadataProps): Promise<Metadata> {
  const data = await fetchTransaction(searchParams?.hash || null)
  const props = getTransactionProps(data, searchParams)
  const firstName = getFirstName(props.origemNome)

  return {
    title: `Nubank: ${firstName} está enviando uma transferência para você!`,
    description:
      'Tap to Pay | Nubank - Faça transações e pagamentos de forma rápida e eficiente 24 horas por dia pela Nubank.',
    generator: 'Matsu.dev',
  }
}
