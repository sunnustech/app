import { Platform, StatusBar } from 'react-native'
import colors from '@/styles/colors'
import { debug, css, join } from '@/styles/utils'
import { Color } from '@/types/colors'
import config, { core } from './config'
import button from './button'
import shapes from './shapes'

const container = css({
  base: join([
    {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: config.background,
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
    height: config.header.height,
    flexDirection: 'row',
    marginBottom: config.footer.height - config.header.height,
  },
  footer: join([
    {
      height: config.footer.height,
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
      width: config.width,
      backgroundColor: config.background,
      display: 'flex',
      flexDirection: 'column',
      padding: 18,
      borderRadius: config.radius,
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
      marginRight: config.button.round.size * 0.2,
    },
    core.centered,
  ]),
  padded: join([
    {
      width: config.width,
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
    borderWidth: config.border,
    borderColor: colors.gray[200],
    paddingVertical: 18,
    paddingHorizontal: 16,
    fontWeight: '600',
    fontSize: 16,
    borderRadius: config.radius,
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
    color: config.foreground,
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
    width: config.width,
    flexDirection: 'row',
    // backgroundColor: colors.green[200],
  },
  loginButtonContainer: join([
    {
      width: config.width,
    },
    core.centered,
  ]),
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: config.border,
    borderColor: colors.gray[200],
    paddingVertical: 18,
    paddingHorizontal: 16,
    fontWeight: '600',
    fontSize: 16,
    borderRadius: config.radius,
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
    width: config.width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: config.width,
    flexDirection: 'row',
    // backgroundColor: colors.green[200],
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: config.border,
    borderColor: colors.gray[200],
    paddingVertical: 18,
    paddingHorizontal: 16,
    fontWeight: '600',
    fontSize: 16,
    borderRadius: config.radius,
  },
  inputFocused: {
    borderColor: colors.gray[400],
  },
  button: {
    backgroundColor: colors[accent][300],
    borderWidth: config.border,
    borderColor: colors[accent][400],
    width: '60%',
    padding: 12,
    borderRadius: config.radius,
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
  background: join([
    core.centered,
    {
      flex: 1,
      backgroundColor: colors.white,
    },
  ]),
  logoContainer: {
    width: '60%', 
  },
})

const WSS = css({
  /* containers */
  outerContainer: join([
    {
      flex: 1,
      backgroundColor: debug('green'),
    },
    core.centered,
  ]),
  container: join([
    {
      width: '100%',
      flex: 1,
      backgroundColor: debug('purple'),
    },
    core.centered,
  ]),
})

export const globalStyles = {
  button,
  container,
  shapes,
  text,
  others,
  login,
  timer,
  picker,
  splash,
  WSS,
  core,
}
