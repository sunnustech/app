import { Dimensions, StyleSheet } from 'react-native'
import colors from '@/styles/colors'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const styles = StyleSheet.create({
  /* containers */
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    backgroundColor: colors.white,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  pickerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    padding: 10,
    backgroundColor: colors.gray[200],
  },
  inputContainer: {
    width: '80%',
  },

  /* login */
  loginContainer: {
    flex: 1,
    backgroundColor: colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* buttons */
  button: {
    backgroundColor: colors.blue[500],
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
  },
  redBg: {
    backgroundColor:colors.red[500],
  },
  greenBg: {
    backgroundColor: colors.green[500],
  },
  buttonOutline: {
    backgroundColor: 'white',
    borderColor:colors.blue[500],
    borderWidth: 2,
  },

  /* button text */
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color:colors.blue[500],
    fontWeight: '700',
    fontSize: 16,
  },

  /* input fields */
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
})

export default styles
