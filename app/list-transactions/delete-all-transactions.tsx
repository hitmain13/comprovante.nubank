'use client'
import { ApiClient } from '@/helpers/api/api-client'
import { useRouter } from 'next/navigation'

export default function DeleteAllTransactions() {
  const apiClient = new ApiClient()
  const router = useRouter()
  const handleOnClick = async () => {
    const confirm = window.confirm('Tem certeza que deseja deletar todas as transações?')
    if (confirm) {
      await apiClient.deleteAllHashes()
      router.refresh()
    }
  }
  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md"
      onClick={handleOnClick}
    >
      Deletar todas as transações
    </button>
  )
}
