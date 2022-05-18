import colors from '@/styles/colors'
import { Color } from '@/types/colors'
import { StyleSheet } from 'react-native'

export function makeAccent(color: Color) {
  // bg: 300, fg: 500, border: 600
  return {
    bg: colors[color][300],
    fg: colors[color][600],
    border: colors[color][500],
  }
}

export const css = StyleSheet.create
