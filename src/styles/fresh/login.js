import { StyleSheet } from 'react-native'
import opts from './opts'
import colors from '@/styles/colors'

const accent = 'orange'

const m = StyleSheet.create({
  button: {
    backgroundColor: colors[accent][300],
    borderWidth: opts.border,
    borderColor: colors[accent][400],
    width: '60%',
    padding: 12,
    borderRadius: opts.radius,
    alignItems: 'center',
  },
})

export default StyleSheet.create({
  /* containers */
  loginContainer: {
    flex: 1,
    backgroundColor: colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: opts.allWidths,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: opts.allWidths,
    flexDirection: 'row',
    // backgroundColor: colors.green[200],
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: opts.border,
    borderColor: colors.gray[200],
    paddingVertical: 18,
    paddingHorizontal: 16,
    fontWeight: '600',
    fontSize: 16,
    borderRadius: opts.radius,
  },
  button: {
    backgroundColor: colors[accent][300],
    borderWidth: opts.border,
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
    justifyContent: 'center'
  },
  loadingIndicator: {},
})
