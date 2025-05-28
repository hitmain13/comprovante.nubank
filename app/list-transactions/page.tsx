import { ApiClient } from '@/helpers/api/api-client'
import DeleteAllTransactions from './delete-all-transactions'

export default async function ListTransactionsPage() {
  const apiClient = new ApiClient()
  const transactions = await apiClient.getAllTransactions()

  console.log(transactions)
  return (
    <Container>
      <Card>
        <h1 className="text-2xl font-bold">Listagem de transações</h1>
        {transactions?.length === 0 ? (
          <p>Não há transações</p>
        ) : (
          <>
            <div className="flex flex-col items-center justify-between my-4 gap-4">
              <h2 className="text-lg font-bold">Total de transações: {transactions.length}</h2>
              <DeleteAllTransactions />
            </div>
            <ul className="flex flex-col gap-4">
              {transactions?.map((transaction) => (
                <li key={transaction.id}>
                  <div>
                    <p>Hash: {transaction.hash}</p>
                    <p>Pix: {transaction.pix}</p>
                    <p>Valor: {transaction.value}</p>
                    <p>Destino: {transaction.destName}</p>
                    <p>CPF: {transaction.destCpf}</p>
                    <p>Origem: {transaction.originName}</p>
                    <p>CPF: {transaction.originCpf}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>
    </Container>
  )
}

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 p-4 m-4 border border-gray-300 rounded-md shadow-md">
      {children}
    </div>
  )
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4 flex flex-col items-center">{children}</div>
}
