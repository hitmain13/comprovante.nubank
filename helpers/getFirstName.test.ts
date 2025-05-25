import { getFirstName } from './getFirstName'

describe('getFirstName', () => {
  it('retorna o primeiro nome de nome completo', () => {
    expect(getFirstName('João da Silva')).toBe('João')
  })
  it('retorna o próprio nome se for único', () => {
    expect(getFirstName('Maria')).toBe('Maria')
  })
  it('retorna string vazia se for vazio', () => {
    expect(getFirstName('')).toBe('')
  })
  it('ignora espaços extras', () => {
    expect(getFirstName('  Ana Paula  ')).toBe('Ana')
  })
  it('retorna string original se não houver espaço', () => {
    expect(getFirstName('Carlos')).toBe('Carlos')
  })
  it('retorna string original se for null', () => {
    // @ts-expect-error
    expect(getFirstName(null)).toBe(null)
  })
  it('retorna string original se for undefined', () => {
    // @ts-expect-error
    expect(getFirstName(undefined)).toBe(undefined)
  })
  it('retorna string original se for número', () => {
    // @ts-expect-error
    expect(getFirstName(123)).toBe(123)
  })
  it('retorna string original se for objeto', () => {
    // @ts-expect-error
    expect(getFirstName({})).toEqual({})
  })
  it('retorna string original se for array', () => {
    // @ts-expect-error
    expect(getFirstName(['Ana'])).toEqual(['Ana'])
  })
})
