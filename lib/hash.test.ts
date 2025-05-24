import { generateReversibleHash, decodeReversibleHash, generatePersistedHash } from './hash'

describe('Hash Helpers', () => {
  const params = {
    valor: '1234.56',
    pix: '11999999999',
    origem_nome: 'João',
    destino_nome: 'Maria',
  }

  it('gera e decodifica hash reversível corretamente', () => {
    const hash = generateReversibleHash(params)
    expect(typeof hash).toBe('string')
    const decoded = decodeReversibleHash(hash)
    expect(decoded).toEqual(params)
  })

  it('gera e decodifica hash reversível com mais de 5 querystrings', () => {
    const paramsMany = {
      valor: '1234.56',
      pix: '11999999999',
      origem_nome: 'João',
      destino_nome: 'Maria',
      agencia: '0001',
      conta: '123456-7',
      cpf: '123.456.789-00',
      banco: 'NUBANK',
      transacao_id: 'ABC123XYZ987',
    }
    const hash = generateReversibleHash(paramsMany)
    expect(typeof hash).toBe('string')
    const decoded = decodeReversibleHash(hash)
    expect(decoded).toEqual(paramsMany)
  })

  it('retorna null ao decodificar hash reversível inválido', () => {
    expect(decodeReversibleHash('hashinvalido')).toBeNull()
    expect(decodeReversibleHash('')).toBeNull()
  })

  it('gera hash persistido curto e determinístico', () => {
    const hash1 = generatePersistedHash(params)
    const hash2 = generatePersistedHash(params)
    expect(typeof hash1).toBe('string')
    expect(hash1.length).toBeLessThanOrEqual(15)
    expect(hash1).toBe(hash2)
  })

  it('hash persistido muda se os dados mudam', () => {
    const hash1 = generatePersistedHash(params)
    const hash2 = generatePersistedHash({ ...params, valor: '999' })
    expect(hash1).not.toBe(hash2)
  })
})
