import { StyleSheet } from 'react-native'
import opts from './opts'
import colors from '@/styles/colors'

const accent = 'orange'

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
    marginBottom: 10,
  },

  image: {
    marginBottom: opts.marginBottom,
    width: 244,
    height: 180,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: opts.border,
    borderColor: colors.gray[200],
    paddingVertical: 10,
    fontWeight: '600',
    borderRadius: opts.radius,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  button: {
    backgroundColor: colors[accent][300],
    borderWidth: opts.border,
    borderColor: colors[accent][400],
    width: '60%',
    padding: 12,
    borderRadius: opts.radius,
    marginVertical: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.gray[50],
    borderWidth: opts.border,
    borderColor: colors[accent][400],
    width: '60%',
    padding: 12,
    borderRadius: opts.radius,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    // TODO: add custom fonts
    color: colors[accent][800],
    fontWeight: '600',
    fontSize: 18,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
})
