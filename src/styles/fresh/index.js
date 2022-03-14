import { StyleSheet } from 'react-native'

const radius = 10
const border = 3
const allWidths = '60%'
const marginBottom = 20

const styles = StyleSheet.create({
  /* containers */
  loginContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: allWidths,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: allWidths,
    marginBottom,
  },

  image: {
    marginBottom,
    width: 244,
    height: 180,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: border,
    borderColor: '#e5e7eb',
    paddingVertical: 10,
    fontWeight: '600',
    borderRadius: radius,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#fdba74',
    borderWidth: border,
    borderColor: '#f59e0b',
    width: '60%',
    padding: 12,
    borderRadius: radius,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    // TODO: add custom fonts
    color: '#9a3412',
    fontWeight: '600',
    fontSize: 18,
  },
})

export default styles
