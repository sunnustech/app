import { Dimensions, StyleSheet } from 'react-native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const map = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  mapTopRightContainer: {
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

export default map
