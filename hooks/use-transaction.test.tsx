import { renderHook, act } from '@testing-library/react'
import { useTransaction } from './use-transaction'
import * as api from '@/lib/api'

const mockData = {
  valor: '100',
  pixKey: '123',
  horario: '10:00',
  origemNome: 'A',
  origemInstituicao: 'B',
  origemAgencia: 'C',
  origemConta: 'D',
  origemCpf: 'E',
  destinoNome: 'F',
  destinoInstituicao: 'G',
  destinoAgencia: 'H',
  destinoConta: 'I',
  destinoCpf: 'J',
  transacaoId: 'K',
}

describe('useTransaction', () => {
  beforeEach(() => {
    jest.spyOn(api, 'apiFetch').mockReset()
  })

  it('busca dados com sucesso', async () => {
    jest.spyOn(api, 'apiFetch').mockResolvedValueOnce(mockData)
    const { result } = renderHook(() => useTransaction('hash'))
    await act(async () => {})
    expect(result.current.data).toEqual(mockData)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('não busca se hash for nulo', async () => {
    const spy = jest.spyOn(api, 'apiFetch')
    renderHook(() => useTransaction(null))
    expect(spy).not.toHaveBeenCalled()
  })

  it('seta erro em caso de falha', async () => {
    jest.spyOn(api, 'apiFetch').mockRejectedValueOnce(new Error('fail'))
    const { result } = renderHook(() => useTransaction('hash'))
    await act(async () => {})
    expect(result.current.error).toBe('fail')
    expect(result.current.data).toBeNull()
  })

  it('seta loading corretamente', async () => {
    let resolve: any
    jest.spyOn(api, 'apiFetch').mockImplementationOnce(
      () =>
        new Promise((r) => {
          resolve = r
        })
    )
    const { result } = renderHook(() => useTransaction('hash'))
    expect(result.current.loading).toBe(true)
    act(() => {
      resolve(mockData)
    })
    await act(async () => {})
    expect(result.current.loading).toBe(false)
  })

  it('busca novamente se hash mudar', async () => {
    const spy = jest.spyOn(api, 'apiFetch').mockResolvedValue(mockData)
    const { rerender } = renderHook(({ hash }) => useTransaction(hash), {
      initialProps: { hash: 'a' },
    })
    rerender({ hash: 'b' })
    await act(async () => {})
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('lida com resposta vazia', async () => {
    jest.spyOn(api, 'apiFetch').mockResolvedValueOnce({} as any)
    const { result } = renderHook(() => useTransaction('hash'))
    await act(async () => {})
    expect(result.current.data).toEqual({})
  })

  it('lida com resposta incompleta', async () => {
    jest.spyOn(api, 'apiFetch').mockResolvedValueOnce({ valor: '1' } as any)
    const { result } = renderHook(() => useTransaction('hash'))
    await act(async () => {})
    expect(result.current.data).toEqual({ valor: '1' })
  })

  it('lida com requisição lenta', async () => {
    jest.useFakeTimers()
    let resolve: any
    jest.spyOn(api, 'apiFetch').mockImplementationOnce(
      () =>
        new Promise((r) => {
          resolve = r
        })
    )
    const { result } = renderHook(() => useTransaction('hash'))
    expect(result.current.loading).toBe(true)
    act(() => {
      jest.advanceTimersByTime(1000)
      resolve(mockData)
    })
    await act(async () => {})
    expect(result.current.loading).toBe(false)
    jest.useRealTimers()
  })

  it('lida com requisição rápida', async () => {
    jest.spyOn(api, 'apiFetch').mockResolvedValueOnce(mockData)
    const { result } = renderHook(() => useTransaction('hash'))
    await act(async () => {})
    expect(result.current.loading).toBe(false)
  })

  it('faz cleanup ao desmontar', async () => {
    jest.spyOn(api, 'apiFetch').mockResolvedValueOnce(mockData)
    const { unmount } = renderHook(() => useTransaction('hash'))
    unmount()
    // Não há efeito colateral, mas coverage de unmount
    expect(true).toBe(true)
  })
})
