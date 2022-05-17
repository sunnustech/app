import { Platform, StatusBar } from 'react-native'
import colors from '@/styles/colors'
import { css } from '@/styles/utils'
import { Color } from '@/types/colors'
import config, { debug, core, centered, marginAuto, shadow } from './config'
import button from './button'
import shapes from './shapes'
import text from './text'

const container = css({
  base: centered({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: config.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }),
  body: centered({
    flex: 1,
    width: '100%',
    backgroundColor: debug('purple'),
  }),
  header: {
    height: config.header.height,
    flexDirection: 'row',
    marginBottom: config.footer.height - config.header.height,
  },
  footer: centered({
    height: config.footer.height,
    flexDirection: 'row',
    backgroundColor: debug('pink'),
  }),
  scrollBase: centered({
    paddingTop: 64,
    paddingBottom: 64,
  }),
  modal: marginAuto({
    width: config.width,
    backgroundColor: config.background,
    display: 'flex',
    flexDirection: 'column',
    padding: 18,
    borderRadius: config.radius,
  }),
  headerLogo: {
    marginLeft: 24,
    width: config.header.height * 0.4 * config.aspectRatio.SunNUS,
    backgroundColor: debug('blue'),
  },
  headerIcons: centered({
    marginRight: config.button.round.size * 0.2,
    backgroundColor: debug('green'),
  }),
  padded: centered({
    width: config.width,
  }),
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
  mapCallout: {
    height: 160,
    width: 200,
    marginBottom: 10,
    borderRadius: config.radius,
    borderWidth: config.border,
    borderColor: colors.gray[300],
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: config.background
  },
  overlap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  points: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pointsText: {
    backgroundColor: colors.white,
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  }
})

const others = css({
  inputContainer: {
    width: config.width,
    flexDirection: 'row',
    // backgroundColor: colors.green[200],
  },
  loginButtonContainer: centered({
    width: config.width,
  }),
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
  pickerContainer: centered(
    shadow({
      width: '80%',
      height: 64,
      backgroundColor: colors.bg,
      paddingHorizontal: 18,
      paddingVertical: 8,
      marginBottom: 12,
      flexDirection: 'row',
      display: 'flex',
    })
  ),
  pickerText: {
    fontWeight: '700',
    width: '100%',
    fontSize: 18,
    color: colors.fg,
    textAlign: 'center',
  },
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
  core,
}
