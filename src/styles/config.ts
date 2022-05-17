import { makeAccent, css } from '@/styles/utils'
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import colors from '@/styles/colors'

const config = {
  border: 3,
  accents: {
    SOAR: makeAccent('amber'),
    WSS: makeAccent('sky'),
    TSS: makeAccent('green'),
    DEV: makeAccent('purple'),
    GenerateQR: makeAccent('pink'),
  },
  width: '70%',
  background: colors.white,
  foreground: colors.gray[800],
  radius: 10,
  header: {
    height: 50,
  },
  footer: {
    height: 80,
  },
  button: {
    round: {
      size: 56,
      radius: 100,
    },
  },
  map: {
    baseButton: {
      size: 56,
      color: colors.white,
    },
  },
}

export const core = css({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  focused: {
    backgroundColor: colors.gray[200],
  },
  marginAuto: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  shadow: {
    elevation: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  translucent: {
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  transparent: {
    backgroundColor: colors.transparent,
  },
})

type Styles = ViewStyle | TextStyle | ImageStyle

const compose = (targetStyle: Styles) => {
  return (style: Styles): Styles => {
    return StyleSheet.flatten([targetStyle, style])
  }
}

export const centered = compose(core.centered)
export const marginAuto = compose(core.marginAuto)
export const translucent = compose(core.translucent)
export const shadow = compose(core.shadow)

export default config
