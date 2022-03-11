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
  scrollContainer: {
    backgroundColor: '#fff',
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
    backgroundColor: '#eee',
  },
  inputContainer: {
    width: '80%',
  },

  /* login */
  loginContainer: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
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

const map = StyleSheet.create({
  map: {
    width: WIDTH,
    height: HEIGHT,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
})

const scoreboard = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  scoreboardTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#f95b78',
    textShadowColor: 'black',
    textShadowOffset: { width: 0.5, height: 1 },
    textShadowRadius: 2,
    textAlign: 'center',
    paddingTop: 20,
    paddingLeft: 30,
  },
  itemName: {
    flex: 0.6,
    alignItems: 'flex-start',
    padding: 10,
    marginVertical: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  itemScore: {
    flex: 0.2,
    alignItems: 'flex-start',
    padding: 10,
    marginVertical: 8,
    textAlign: 'center',
    color: '#f95b78',
    fontWeight: '500',
  },
  itemTrophy: {
    flex: 0.2,
    alignItems: 'flex-start',
    padding: 10,
    marginVertical: 8,
    textAlign: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.7,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },

  /* pickers */
  textPicker: {
    backgroundColor: '#0782F9',
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
export { map, scoreboard, notifications }
