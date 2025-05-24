import { getRelativeTimeLabel } from './getRelativeTimeLabel'

describe('getRelativeTimeLabel', () => {
  const base = new Date('2024-05-23T15:30:00')

  it('retorna "Agora mesmo" para o mesmo horário', () => {
    expect(getRelativeTimeLabel(new Date('2024-05-23T15:30:00'), base)).toBe('Agora mesmo')
  })

  it('retorna "1 minuto atrás" para 1 minuto antes', () => {
    expect(getRelativeTimeLabel(new Date('2024-05-23T15:29:00'), base)).toBe('1 minuto atrás')
  })

  it('retorna "10 minutos atrás" para 10 minutos antes', () => {
    expect(getRelativeTimeLabel(new Date('2024-05-23T15:20:00'), base)).toBe('10 minutos atrás')
  })

  it('retorna "59 minutos atrás" para 59 minutos antes', () => {
    expect(getRelativeTimeLabel(new Date('2024-05-23T14:31:00'), base)).toBe('59 minutos atrás')
  })

  it('retorna "1 hora atrás" para 1 hora antes', () => {
    expect(getRelativeTimeLabel(new Date('2024-05-23T14:30:00'), base)).toBe('1 hora atrás')
  })

  it('retorna "2 horas atrás" para 2 horas antes', () => {
    expect(getRelativeTimeLabel(new Date('2024-05-23T13:30:00'), base)).toBe('2 horas atrás')
  })

  it('retorna "Agora mesmo" para horários no futuro', () => {
    expect(getRelativeTimeLabel(new Date('2024-05-23T15:31:00'), base)).toBe('Agora mesmo')
    expect(getRelativeTimeLabel(new Date('2024-05-23T16:00:00'), base)).toBe('Agora mesmo')
  })

  it('lida com horários de meia-noite corretamente', () => {
    const meiaNoite = new Date('2024-05-23T00:00:00')
    expect(getRelativeTimeLabel(new Date('2024-05-23T23:59:00'), meiaNoite)).toBe('Agora mesmo')
    expect(getRelativeTimeLabel(new Date('2024-05-23T00:00:00'), meiaNoite)).toBe('Agora mesmo')
  })

  it('lança erro se inputDate ou now não for passado', () => {
    // @ts-expect-error
    expect(() => getRelativeTimeLabel(undefined, base)).toThrow(
      'Os parâmetros inputDate e now são obrigatórios'
    )
    // @ts-expect-error
    expect(() => getRelativeTimeLabel(null, base)).toThrow(
      'Os parâmetros inputDate e now são obrigatórios'
    )
    // @ts-expect-error
    expect(() => getRelativeTimeLabel(base, undefined)).toThrow(
      'Os parâmetros inputDate e now são obrigatórios'
    )
    // @ts-expect-error
    expect(() => getRelativeTimeLabel(base, null)).toThrow(
      'Os parâmetros inputDate e now são obrigatórios'
    )
  })

  it('retorna "1 hora atrás" para diferença de 60 minutos', () => {
    expect(getRelativeTimeLabel(new Date('2024-05-23T14:30:00'), base)).toBe('1 hora atrás')
  })

  it('retorna "Agora mesmo" para diferença negativa', () => {
    expect(getRelativeTimeLabel(new Date('2024-05-23T16:00:00'), base)).toBe('Agora mesmo')
  })
})
