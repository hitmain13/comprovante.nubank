import { defaultTextAreaValue } from '@/constants'
import { ApiClient } from '@/helpers/api'
import { parseQueryString } from '@/helpers/parseQuerystring'
import { generatePersistedHash, generateReversibleHash } from '@/lib/hash'
import { useState } from 'react'

export const useHashGeneratorClient = () => {
  const [query, setQuery] = useState(defaultTextAreaValue)
  const [hash, setHash] = useState('')
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [hashType, setHashType] = useState<'reversivel' | 'persistido'>('reversivel')

  const updateHash = (hash: string | Promise<string | undefined>) => {
    if (!hash || typeof hash !== 'string') return
    setHash(hash)
    setUrl(`/comprovante/${hash}`)
    setCopied(false)
    stopLoading()
  }

  async function handleGenerate() {
    startLoading()
    const params = parseQueryString(query)
    const apiClient = new ApiClient()

    const hashStr =
      hashType === 'reversivel' ? generateReversibleHash(params) : generatePersistedHash(params)

    try {
      const res = await apiClient.createHash({ params })

      if (res?.hash) {
        return updateHash(res.hash)
      }
    } catch (error) {
      console.warn('Erro ao gerar hash via API, usando fallback local:', error)
    }

    return updateHash(hashStr)
  }

  const handleDelete = async () => {
    try {
      if (!hash) return
      setDeleteLoading(true)
      const apiClient = new ApiClient()
      const res = await apiClient.deleteHash(hash)
      if (res?.hash) {
        setDeleteLoading(false)
        return updateHash(res.hash)
      }
    } catch (error) {
      console.warn('Erro ao deletar hash via API, usando fallback local:', error)
    }
    setDeleteLoading(false)
  }

  const handleDeleteAll = async () => {
    setDeleteLoading(true)
    const apiClient = new ApiClient()
    await apiClient.deleteAllHashes()
    setDeleteLoading(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + url)
    setCopied(true)
  }

  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)

  return {
    query,
    setQuery,
    hash,
    setHash,
    url,
    copied,
    hashType,
    setHashType,
    handleGenerate,
    handleCopy,
    loading,
    deleteLoading,
    handleDelete,
    handleDeleteAll,
  }
}
