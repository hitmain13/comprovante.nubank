type ShowConfettiEffectProps = {
  particleCount?: number
  spread?: number
  origin?: { x?: number; y?: number }
  colors?: string[]
  scalar?: number
  zIndex?: number
}

export const showConfettiEffect = ({
  particleCount = 120,
  spread = 80,
  origin = { x: 0.5, y: 0.5 },
  colors = ['#820ad1', '#b226ef', '#fff', '#ffcb05', '#00e1e6', '#ff5fa2'],
  scalar = 1.1,
  zIndex = 9999,
}: ShowConfettiEffectProps) => {
  import('canvas-confetti').then((module: { default: (...args: any[]) => void }) => {
    module.default({
      particleCount,
      spread,
      origin,
      colors,
      scalar,
      zIndex,
    })
  })
}
