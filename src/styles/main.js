import { Dimensions, StyleSheet } from 'react-native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const styles = StyleSheet.create({
  /* containers */
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  inputContainer: {
    width: '80%',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapSideBarContainer: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: WIDTH - 40,
    height: 60,
    top: 50,
    right: 20,
    borderRadius: 2,
    display: 'flex',
    justifyContent: 'space-between',
  },

  /* map */
  map: {
    width: WIDTH,
    height: HEIGHT,
  },

  /* buttons */
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
  },
  redBg: {
    backgroundColor: '#f43f5e',
  },
  greenBg: {
    backgroundColor: '#10b981',
  },
  buttonOutline: {
    backgroundColor: 'white',
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  currentLocationButton: {
    zIndex: 8,
    position: 'absolute',
    width: 45,
    height: 45,
    backgroundColor: '#fff',
    top: HEIGHT - 200,
    left: WIDTH - 70,
    borderRadius: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mapSideButton: {
    marginBottom: 12,
    zIndex: 9,
    width: 45,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  /* button text */
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
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

const notifications = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})

export default styles
export { notifications }
