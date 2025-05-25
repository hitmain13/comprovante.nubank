import { formatToBRL } from './formatToBRL'

describe('formatToBRL', () => {
  it('formata número inteiro', () => {
    expect(formatToBRL(200)).toBe('R$ 200,00')
  })
  it('formata número decimal', () => {
    expect(formatToBRL(1234.56)).toBe('R$ 1.234,56')
  })
  it('formata zero', () => {
    expect(formatToBRL(0)).toBe('R$ 0,00')
  })
  it('formata valores negativos', () => {
    expect(formatToBRL(-50)).toBe('R$ -50,00')
  })
  it('lança erro para NaN', () => {
    expect(() => formatToBRL(NaN)).toThrow('Valor inválido para formatação.')
  })
  it('lança erro para Infinity', () => {
    expect(() => formatToBRL(Infinity)).toThrow('Valor inválido para formatação.')
  })
  it('lança erro para -Infinity', () => {
    expect(() => formatToBRL(-Infinity)).toThrow('Valor inválido para formatação.')
  })
  it('lança erro para string', () => {
    // @ts-expect-error
    expect(() => formatToBRL('abc')).toThrow('Valor inválido para formatação.')
  })
  it('lança erro para objeto', () => {
    // @ts-expect-error
    expect(() => formatToBRL({})).toThrow('Valor inválido para formatação.')
  })
  it('lança erro para undefined', () => {
    // @ts-expect-error
    expect(() => formatToBRL(undefined)).toThrow('Valor inválido para formatação.')
  })
})
