const debugSwitch = false

import { StyleSheet, Platform, StatusBar } from 'react-native'
import colors from '@/styles/colors'
import { Color, Shade } from '@/types/colors'

const css = StyleSheet.create
const join = StyleSheet.flatten

function debug(color: Color, shade?: Shade) {
  return debugSwitch ? colors[color][shade || 100] : colors.transparent
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

const core = css({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

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
    header: join([
      {
        height: opts.button.size,
        width: opts.button.size,
        borderRadius: opts.button.radius,
        // backgroundColor: colors.blue[100],
      },
      core.centered,
    ]),
    footer: join([
      {
        borderRadius: opts.button.radius,
        paddingVertical: 10,
        paddingHorizontal: 14,
        flexDirection: 'row',
      },
      core.centered,
    ]),
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
  base: join([
    {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: opts.background,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    core.centered,
  ]),
  body: join([
    {
      flex: 1,
      width: '100%',
      backgroundColor: debug('purple')
    },
    core.centered,
  ]),
  header: {
    height: opts.header.height,
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    marginBottom: opts.footer.height - opts.header.height,
  },
  headerLogo: {
    paddingLeft: 24,
    width: '40%',
    backgroundColor: debug('blue'),
  },
  headerIcons: join([
    {
      height: '100%',
      flexDirection: 'row',
      backgroundColor: debug('green'),
      marginRight: opts.button.size * 0.2,
    },
    core.centered,
  ]),
  padded: join([
    {
      width: opts.width,
    },
    core.centered,
  ]),
})

export const globalStyles = {
  button,
  container,
  shapes,
  utils,
}
