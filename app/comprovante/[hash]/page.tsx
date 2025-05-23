import { notFound } from 'next/navigation'
import Comprovante from '../page'
import { decodeReversibleHash } from '@/helpers/hash'

// Simulação de um banco de dados em memória
// O hash é a chave, o valor é o objeto de parâmetros
const hashDB: Record<string, Record<string, string>> = {
  // Exemplo: hash gerado para valor=1234.56&pix=11999999999&origem_nome=João
  '4f2k9z1': {
    valor: '1234.56',
    pix: '11999999999',
    origem_nome: 'João',
    destino_nome: 'Maria',
    horario: '14:30',
    origem_instituicao: 'ITAÚ UNIBANCO',
    origem_agencia: '1234',
    origem_conta: '987654-3',
    origem_cpf: '123.456.789-00',
    destino_instituicao: 'NU PAGAMENTOS - IP',
    destino_agencia: '0001',
    destino_conta: '112233-4',
    destino_cpf: '987.654.321-00',
    transacao_id: 'ABC123XYZ987',
  },
  // Adicione outros hashes/objetos conforme necessário
}

function isBase64(str: string): boolean {
  // Verifica se é um base64 válido (simples)
  try {
    return btoa(atob(str)) === str
  } catch {
    return false
  }
}

export default function ComprovanteHashPage({ params }: { params: { hash: string } }) {
  const hash = params.hash
  console.log(hash)
  // 1. Tenta buscar no banco persistido
  if (hashDB[hash]) {
    return <Comprovante searchParams={hashDB[hash]} />
  }
  // 2. Tenta decodificar como base64 reversível
  if (isBase64(hash)) {
    const decoded = decodeReversibleHash(hash)
    if (decoded) {
      return <Comprovante searchParams={decoded} />
    }
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
