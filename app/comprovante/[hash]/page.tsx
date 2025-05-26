import { notFound } from 'next/navigation'
import Comprovante from '../page'
import { decodeReversibleHash, hashDB } from '@/lib'
import { generateMetadataHelper, GenerateMetadataProps } from '@/helpers'

export async function generateMetadata({ searchParams, params }: GenerateMetadataProps) {
  return generateMetadataHelper({ searchParams, params })
}

export default function ComprovanteHashPage({ params }: { params: { hash: string } }) {
  const hash = params.hash
  // 1. Tenta buscar no banco persistido
  if (hashDB[hash]) {
    return <Comprovante searchParams={hashDB[hash]} />
  }
  // 2. Tenta decodificar reversível SEM checar base64
  const decoded = decodeReversibleHash(hash)
  if (decoded) {
    return <Comprovante searchParams={decoded} />
  }
  // 3. Não encontrado
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-2">Comprovante não encontrado</h1>
        <p className="text-gray-500">Verifique se o link está correto ou gere um novo hash.</p>
      </div>
    </div>
  )
}
