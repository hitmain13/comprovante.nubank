'use client'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { useTransferParams } from '@/hooks'

export default function Comprovante() {
  const {
    formattedAmount,
    pixKey,
    name,
    time,
    timeLabel,
    firstName,
    origemNome,
    origemInstituicao,
    origemAgencia,
    origemConta,
    origemCpf,
    destinoNome,
    destinoInstituicao,
    destinoAgencia,
    destinoConta,
    destinoCpf,
  } = useTransferParams()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/flight-money.png"
            alt="Comprovante de transferência"
            className="w-24 h-24 mb-4 object-contain"
          />
          <h1 className="text-2xl font-bold text-center mb-2">
            {firstName} quer realizar uma transferência para você
          </h1>
        </div>
        <Card className="p-4 flex flex-col items-center mb-6">
          <span className="text-xl font-bold text-gray-700 mb-2">Valor</span>
          <span className="text-3xl font-bold text-gray-900 mb-2">{formattedAmount}</span>
          <span className="text-sm text-gray-400">
            {timeLabel} • {time}
          </span>
        </Card>
        <Card className="mb-6 p-4">
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
            <span>{origemNome}</span>
            <span className="font-medium">Instituição</span>
            <span>{origemInstituicao}</span>
            <span className="font-medium">Agência</span>
            <span>{origemAgencia}</span>
            <span className="font-medium">Conta</span>
            <span>{origemConta}</span>
            <span className="font-medium">CPF</span>
            <span>{origemCpf}</span>
          </div>
        </Card>
        <Card className="mb-6 p-4">
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
            <span>{destinoNome}</span>
            <span className="font-medium">Instituição</span>
            <span>{destinoInstituicao}</span>
            <span className="font-medium">Agência</span>
            <span>{destinoAgencia}</span>
            <span className="font-medium">Conta</span>
            <span>{destinoConta}</span>
            <span className="font-medium">CPF</span>
            <span>{destinoCpf}</span>
          </div>
        </Card>
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-md font-semibold">
          Aceitar transferência
        </Button>
      </div>
    </div>
  )
}
