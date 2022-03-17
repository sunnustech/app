import { StyleSheet } from 'react-native'

const sideButton = {
  size: 56,
  color: '#fff',
}

const map = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  overlap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  mapTopRightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  mapBottomRightContainer: {
    alignItems: 'flex-end',
  },

  mapUIContainer: {
    /* take % of screen's dimensions and center it */
    width: '90%',
    height: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',

    display: 'flex',
    flexDirection: 'column',
  },
  mapSideButton: {
    marginBottom: 14,
    width: sideButton.size,
    height: sideButton.size,
    backgroundColor: sideButton.color,
    borderRadius: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export default map
