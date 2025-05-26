import { createTransaction } from './create-transaction'
import * as api from './api'

describe('createTransaction', () => {
  beforeEach(() => {
    jest.spyOn(api, 'apiFetch').mockReset()
  })

  it('cria comprovante com sucesso', async () => {
    jest.spyOn(api, 'apiFetch').mockResolvedValueOnce({ hash: 'abc' })
    const result = await createTransaction({ payload: { foo: 'bar' }, latitude: 1, longitude: 2 })
    expect(result).toEqual({ hash: 'abc' })
    expect(api.apiFetch).toHaveBeenCalledWith(
      expect.stringContaining('/comprovante'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('cria comprovante sem latitude/longitude', async () => {
    jest.spyOn(api, 'apiFetch').mockResolvedValueOnce({ hash: 'xyz' })
    const result = await createTransaction({ payload: { foo: 1 } })
    expect(result).toEqual({ hash: 'xyz' })
  })

  it('propaga erro do apiFetch', async () => {
    jest.spyOn(api, 'apiFetch').mockRejectedValueOnce(new Error('fail'))
    await expect(createTransaction({ payload: { foo: 'bar' } })).rejects.toThrow('fail')
  })

  it('envia payload correto', async () => {
    const spy = jest.spyOn(api, 'apiFetch').mockResolvedValueOnce({ hash: 'ok' })
    await createTransaction({ payload: { a: 1 }, latitude: 2, longitude: 3 })
    expect(spy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({ payload: { a: 1 }, latitude: 2, longitude: 3 }),
      })
    )
  })

  it('usa URL padrão se env não definido', async () => {
    const oldEnv = process.env.NEXT_PUBLIC_API_URL
    delete process.env.NEXT_PUBLIC_API_URL
    jest.spyOn(api, 'apiFetch').mockResolvedValueOnce({ hash: 'ok' })
    await createTransaction({ payload: { a: 1 } })
    expect(api.apiFetch).toHaveBeenCalledWith(
      expect.stringContaining('http://localhost:3001/comprovante'),
      expect.any(Object)
    )
    process.env.NEXT_PUBLIC_API_URL = oldEnv
  })

  it('usa URL customizada se env definido', async () => {
    process.env.NEXT_PUBLIC_API_URL = 'http://api'
    jest.spyOn(api, 'apiFetch').mockResolvedValueOnce({ hash: 'ok' })
    await createTransaction({ payload: { a: 1 } })
    expect(api.apiFetch).toHaveBeenCalledWith(
      expect.stringContaining('http://api/comprovante'),
      expect.any(Object)
    )
  })

  it('envia body como string', async () => {
    const spy = jest.spyOn(api, 'apiFetch').mockResolvedValueOnce({ hash: 'ok' })
    await createTransaction({ payload: { test: true } })
    expect(typeof spy.mock.calls?.[0]?.[1]?.body).toBe('string')
  })

  it('envia método POST', async () => {
    const spy = jest.spyOn(api, 'apiFetch').mockResolvedValueOnce({ hash: 'ok' })
    await createTransaction({ payload: { test: true } })
    expect(spy.mock.calls[0][1]?.method).toBe('POST')
  })

  it('envia latitude/longitude como undefined se não informado', async () => {
    const spy = jest.spyOn(api, 'apiFetch').mockResolvedValueOnce({ hash: 'ok' })
    await createTransaction({ payload: { test: true } })
    const body = spy.mock.calls[0][1]?.body as string
    expect(JSON.parse(body)).toHaveProperty('latitude', undefined)
    expect(JSON.parse(body)).toHaveProperty('longitude', undefined)
  })
})
