const debugSwitch = false

import { StyleSheet, Platform, StatusBar } from 'react-native'
import colors from '@/styles/colors'
import { Color } from '@/types/colors'

function debug(color: Color) {
  return debugSwitch ? colors[color][200] : colors.transparent
} 

const opts = {
  width: '70%',
  background: colors.white,
  header: {
    height: 50,
  },
  footer: {
    height: 80,
  },
  button: {
    size: 56,
    radius: 100,
  },
  map: {
    baseButton: {
      size: 56,
      color: colors.white,
    },
  },
}

const css = StyleSheet.create

const button = {
  map: css({
    base: {
      width: opts.map.baseButton.size,
      height: opts.map.baseButton.size,
      backgroundColor: opts.map.baseButton.color,
      borderRadius: opts.button.radius,
      justifyContent: 'space-around',
      alignItems: 'center',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
    },
    blue: {
      backgroundColor: colors.blue[400],
    },
    whiteText: {
      fontWeight: '800',
      color: 'white',
      textAlign: 'center',
    },
    bottomButton: {
      marginTop: 14,
    },
  }),
  outline: css({
    base: {
      height: opts.button.size,
      width: opts.button.size,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: opts.button.radius,
      // backgroundColor: colors.blue[100],
    },
  }),
}

const utils = css({
  transparent: {
    backgroundColor: colors.transparent,
  },
})

const shapes = css({
  circle: {
    marginVertical: 2,
    height: 4,
    width: 4,
    borderRadius: opts.button.radius,
    borderColor: colors.transparent,
    borderWidth: 1.4,
    backgroundColor: colors.red[400],
  },
})

const container = css({
  base: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: opts.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  body: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green[100],
  },
  header: {
    height: opts.header.height,
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    marginBottom: opts.footer.height - opts.header.height,
    // backgroundColor: colors.blue[100],
  },
  headerLogo: {
    paddingLeft: 24,
    width: '40%',
    backgroundColor: debug('blue')
  },
  headerIcons: {
    height: '100%',
    flexDirection: 'row',
    backgroundColor: debug('green'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: opts.button.size * 0.2,
  },
  padded: {
    width: opts.width,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const globalStyles = {
  button,
  container,
  shapes,
  utils,
}
