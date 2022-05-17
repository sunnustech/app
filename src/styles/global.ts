const debugSwitch = false

import { StyleSheet, Platform, StatusBar } from 'react-native'
import colors from '@/styles/colors'
import { makeAccent, createDebugger } from '@/styles/utils'
import { Color } from '../types/colors'

const debug = createDebugger(debugSwitch)

const css = StyleSheet.create
const join = StyleSheet.flatten

const opts = {
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
    pill: {
      border: 3,
    },
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
  focused: {
    backgroundColor: colors.gray[200],
  },
  marginAuto: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

const button = {
  map: css({
    base: {
      width: opts.map.baseButton.size,
      height: opts.map.baseButton.size,
      backgroundColor: opts.map.baseButton.color,
      borderRadius: opts.button.round.radius,
      elevation: 10,
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
    qrBack: join([
      {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 1000,
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        padding: 20,
        marginBottom: 36,
      },
      core.marginAuto,
    ]),
  }),
  outline: css({
    header: join([
      {
        height: opts.button.round.size,
        width: opts.button.round.size,
        borderRadius: opts.button.round.radius,
        // backgroundColor: colors.blue[100],
      },
      core.centered,
    ]),
    footer: join([
      {
        borderRadius: opts.button.round.radius,
        paddingVertical: 10,
        paddingHorizontal: 14,
        flexDirection: 'row',
        backgroundColor: debug('amber'),
      },
      core.centered,
    ]),
    back: {
      color: colors.homeFg,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      height: 50,
      width: 50,
    },
  }),
  pill: css({
    base: {
      width: '100%',
      borderWidth: opts.button.pill.border,
      padding: 10,
      borderRadius: opts.radius,
      marginVertical: 8,
      alignItems: 'center',
    },
    tss: {
      flex: 1,
      marginTop: 24,
      height: 64,
      paddingHorizontal: 18,
      paddingVertical: 8,
      borderRadius: 6,
      shadowColor: colors.shadow,
      shadowRadius: 2,
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 5 },
      marginBottom: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      display: 'flex',
      borderWidth: 4,
      borderColor: colors.transparent,
    },
  }),
  series: css({
    base: join([
      {
        width: '100%',
        borderWidth: opts.button.pill.border,
        height: 108,
        borderBottomRightRadius: opts.radius,
        borderTopLeftRadius: opts.radius,
        marginVertical: 10,
      },
      core.centered,
    ]),
  }),
}

const utils = css({
  transparent: {
    backgroundColor: colors.transparent,
  },
  focused: {
    backgroundColor: colors.gray[200],
  },
})

const shapes = css({
  circle: {
    marginVertical: 2,
    height: 4,
    width: 4,
    borderRadius: opts.button.round.radius,
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
      backgroundColor: debug('purple'),
    },
    core.centered,
  ]),
  header: {
    height: opts.header.height,
    flexDirection: 'row',
    marginBottom: opts.footer.height - opts.header.height,
  },
  footer: join([
    {
      height: opts.footer.height,
      flexDirection: 'row',
      backgroundColor: debug('pink'),
    },
    core.centered,
  ]),
  scrollBase: join([
    {
      paddingTop: 64,
      paddingBottom: 64,
    },
    core.centered,
  ]),
  modal: join([
    {
      width: opts.width,
      backgroundColor: opts.background,
      display: 'flex',
      flexDirection: 'column',
      padding: 18,
      borderRadius: opts.radius,
    },
    core.marginAuto,
  ]),
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
      marginRight: opts.button.round.size * 0.2,
    },
    core.centered,
  ]),
  padded: join([
    {
      width: opts.width,
    },
    core.centered,
  ]),
  series: {
    height: 28,
    width: '100%',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: opts.button.pill.border,
    borderColor: colors.gray[200],
    paddingVertical: 18,
    paddingHorizontal: 16,
    fontWeight: '600',
    fontSize: 16,
    borderRadius: opts.radius,
  },
  backButton: {
    height: 50,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: debug('blue'),
  },
})

const text = css({
  settings: {
    marginLeft: 4,
    fontWeight: '600',
    color: opts.foreground,
    textAlign: 'center',
  },
  pillButton: {
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
  },
  back: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.homeFg,
  },
})

const others = css({
  inputContainer: {
    width: opts.width,
    flexDirection: 'row',
    // backgroundColor: colors.green[200],
  },
  loginButtonContainer: join([
    {
      width: opts.width,
    },
    core.centered,
  ]),
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: opts.button.pill.border,
    borderColor: colors.gray[200],
    paddingVertical: 18,
    paddingHorizontal: 16,
    fontWeight: '600',
    fontSize: 16,
    borderRadius: opts.radius,
  },
  inputFocused: {
    borderColor: colors.gray[400],
  },
  spacer: {
    height: 36,
  },
  errorMessage: {
    fontWeight: '500',
    color: colors.red[500],
  },
})

const timer = css({
  /* containers */
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
  },
  smallSecondsContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(28, 28, 28, 0.2)',
    overflow: 'hidden',
  },
  textContainer: {
    flexDirection: 'row',
  },
  number: {
    fontVariant: ['tabular-nums'],
  },
  hourMinutes: {
    color: colors.gray[700],
    fontSize: 36,
    marginRight: 4,
    fontWeight: '500',
  },
  seconds: {
    fontWeight: '400',
    color: colors.gray[600],
    paddingTop: 3,
    fontSize: 24,
  },
  progressContainer: {
    height: 2,
    marginBottom: -2,
    width: '100%',
  },
  progressBar: {
    height: 2,
    width: '20%',
    backgroundColor: colors.emerald[300],
  },
})

const accent: Color = 'orange'

const login = css({
  /* containers */
  loginContainer: {
    flex: 1,
    backgroundColor: colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: opts.width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: opts.width,
    flexDirection: 'row',
    // backgroundColor: colors.green[200],
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: opts.button.pill.border,
    borderColor: colors.gray[200],
    paddingVertical: 18,
    paddingHorizontal: 16,
    fontWeight: '600',
    fontSize: 16,
    borderRadius: opts.radius,
  },
  inputFocused: {
    borderColor: colors.gray[400],
  },
  button: {
    backgroundColor: colors[accent][300],
    borderWidth: opts.button.pill.border,
    borderColor: colors[accent][400],
    width: '60%',
    padding: 12,
    borderRadius: opts.radius,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors[accent][100],
    borderColor: colors[accent][200],
  },
  buttonText: {
    // TODO: add custom fonts
    color: colors[accent][800],
    fontWeight: '600',
    fontSize: 18,
  },
  errorMessage: {
    fontWeight: '500',
    color: colors.red[500],
  },
  spacer: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIndicator: {},
})

const picker = css({
  pickerContainer: {
    width: '80%',
    height: 64,
    backgroundColor: colors.bg,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 6,
    shadowColor: colors.shadow,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',
  },
  pickerTextContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  pickerText: {
    width: '100%',
    fontSize: 18,
    color: colors.fg,
    fontWeight: '700',
    textAlign: 'center',
  },
})

const splash = css({

  /* containers */
  background: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: '60%',
    justifyContent: 'center',
  },
})

export const globalStyles = {
  button,
  container,
  shapes,
  utils,
  text,
  others,
  login,
  timer,
  picker,
  splash
}
