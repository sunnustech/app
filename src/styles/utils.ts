import colors from '@/styles/colors'
import { Color, Shade } from '@/types/colors'

export function makeAccent(color: Color) {
  return {
    bg: colors[color][300],
    fg: colors[color][600],
    border: colors[color][500],
  }
}

export function createDebugger(debug: boolean) {
  const helper = (color: Color, shade?: Shade) => {
    return debug ? colors[color][shade || 100] : colors.transparent
  }
  return helper
}
