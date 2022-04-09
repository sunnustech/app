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

  /* picker stuff */
  pickerContainer: {
    width: '80%',
    height: 48,
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 6,
    shadowColor: '#000000',
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
    color: '#4b5563',
    fontWeight: '700',
    textAlign: 'center',
  },
})
