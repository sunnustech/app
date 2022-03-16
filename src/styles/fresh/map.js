import { Dimensions, StyleSheet } from 'react-native'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const sideButton = {
  size: 56,
  color: '#fff',
}

const map = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  mapTopRightContainer: {
    backgroundColor: '#bbf7d0',
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
    position: 'absolute',
    width: sideButton.size,
    height: sideButton.size,
    backgroundColor: sideButton.color,
    top: HEIGHT - 200,
    left: WIDTH - 70,
    borderRadius: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mapSideButton: {
    marginBottom: 12,
    zIndex: 9,
    width: sideButton.size,
    height: sideButton.size,
    backgroundColor: sideButton.color,
    borderRadius: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export default map
