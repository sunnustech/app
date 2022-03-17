import { StyleSheet } from 'react-native'
import opts from './opts'

export default StyleSheet.create({
  /* containers */
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
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
    marginBottom: opts.marginBottom,
  },

  image: {
    marginBottom: opts.marginBottom,
    width: 244,
    height: 180,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: opts.border,
    borderColor: '#e5e7eb',
    paddingVertical: 10,
    fontWeight: '600',
    borderRadius: opts.radius,
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  /* button base */
  button: {
    width: '100%',
    borderWidth: opts.border,
    padding: 18,
    borderRadius: opts.radius,
    marginVertical: 8,
    alignItems: 'center',
  },

  /* button text */
  buttonText: {
    fontWeight: '600',
    fontSize: 18,
  },
})
