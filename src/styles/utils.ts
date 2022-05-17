const debugSwitch = false

import colors from '@/styles/colors'
import { Color, Shade } from '@/types/colors'
import { StyleSheet } from 'react-native'

export function makeAccent(color: Color) {
  // bg: 300, fg: 500, border: 600
  return {
    bg: colors[color][300],
    fg: colors[color][600],
    border: colors[color][500],
  }
}

function createDebugger(debug: boolean) {
  const helper = (color: Color, shade?: Shade) => {
    return debug ? colors[color][shade || 100] : colors.transparent
  }
  return helper
}
export const debug = createDebugger(debugSwitch)

export const css = StyleSheet.create
