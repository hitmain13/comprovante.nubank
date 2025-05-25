import { apiFetch } from './api'

global.fetch = jest.fn()

describe('apiFetch', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve retornar dados em caso de sucesso', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ foo: 'bar' }),
    })
    const data = await apiFetch<{ foo: string }>('url')
    expect(data).toEqual({ foo: 'bar' })
  })

  it('deve lançar erro em resposta não ok', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      text: async () => 'Erro',
    })
    await expect(apiFetch('url')).rejects.toThrow('Erro')
  })

  it('deve lançar erro padrão se resposta não ok e sem texto', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      text: async () => '',
    })
    await expect(apiFetch('url')).rejects.toThrow('Erro na requisição')
  })

  it('deve passar headers customizados', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({}) })
    await apiFetch('url', { headers: { Authorization: 'Bearer token' } })
    expect(fetch).toHaveBeenCalledWith(
      'url',
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer token' }),
      })
    )
  })

  it('deve aceitar métodos diferentes', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({}) })
    await apiFetch('url', { method: 'POST', body: '{}' })
    expect(fetch).toHaveBeenCalledWith('url', expect.objectContaining({ method: 'POST' }))
  })

  it('deve lidar com resposta não JSON', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('not json')
      },
    })
    await expect(apiFetch('url')).rejects.toThrow('not json')
  })

  it('deve lidar com erro de rede', async () => {
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network'))
    await expect(apiFetch('url')).rejects.toThrow('Network')
  })

  it('deve funcionar sem options', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({ ok: 1 }) })
    const data = await apiFetch('url')
    expect(data).toEqual({ ok: 1 })
  })

  it('deve lidar com resposta vazia', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({}) })
    const data = await apiFetch('url')
    expect(data).toEqual({})
  })

  it('deve lidar com lentidão (timeout simulado)', async () => {
    jest
      .useFakeTimers()(fetch as jest.Mock)
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve({ ok: true, json: async () => ({ slow: true }) }), 1000)
          })
      )
    const promise = apiFetch('url')
    jest.advanceTimersByTime(1000)
    await expect(promise).resolves.toEqual({ slow: true })
    jest.useRealTimers()
  })
})
