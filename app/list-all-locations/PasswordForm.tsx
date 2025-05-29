'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ApiClient } from '@/helpers/api/api-client'
import { loginSuccessful } from '@/helpers/api/login-successful'

export default function PasswordForm() {
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const apiClient = new ApiClient()
    const result = await apiClient.checkPassword(password)
    console.log('result', result)
    if (!result.success) setError(result.error)
    else if (result.success && result.data) {
      loginSuccessful()
      setLoading(false)
      router.refresh()
    } else if (result.success && !result.data) {
      setError('Senha incorreta')
      setLoading(false)
    }
  }

  return (
    <form
      className="flex flex-col gap-4 max-w-sm mx-auto mt-8"
      onSubmit={handleSubmit}
    >
      <label htmlFor="password">Senha</label>
      <input
        name="password"
        type="password"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? 'Validando...' : 'Acessar'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
