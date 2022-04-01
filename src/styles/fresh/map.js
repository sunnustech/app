import { StyleSheet } from 'react-native'

const sideButton = {
  size: 56,
  color: '#fff',
}

const gemSize = 36

const map = StyleSheet.create({
  /* ==========
   * containers
   * ==========
   */
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  centered: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  overlap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  navigationContainer: {
    // backgroundColor: '#bbf7d0',
    // opacity: 0.7,
  },
  timerContainer: {
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    // backgroundColor: '#bbf7d0',
    // opacity: 0.7,
  },
  mapTopContainer: {
    flex: 1,
    alignItems: 'flex-end',
    // backgroundColor: '#bbf7d0',
    // opacity: 0.7,
  },
  mapBottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: '#93c5fd',
    // opacity: 0.6,
  },
  mapRightContainer: {
    alignItems: 'flex-end',
  },
  mapLeftContainer: {
    flex: 1,
  },
  mapUIContainer: {
    /* take % of screen's dimensions and center it */
    width: '90%',
    height: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',

    display: 'flex',
    flexDirection: 'column',
  },
  /* ===========
   * text fields
   * ===========
   */
  timerText: {
    fontSize: 36,
    fontWeight: '600',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  flex1: {
    flex: 1,
  },

  mapSideButton: {
    width: sideButton.size,
    height: sideButton.size,
    backgroundColor: sideButton.color,
    borderRadius: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#282828',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  mapTopButton: {
    marginBottom: 14,
  },
  mapActivatedButton: {
    backgroundColor: '#60A5FA',
  },
  mapCurrentLocationButton: {
    backgroundColor: '#60A5FA',
  },
  mapBottomButton: {
    marginTop: 14,
  },
  mapNavigationButton: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.15);',
    width: sideButton.size,
    height: sideButton.size,
    shadowColor: '#282828',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  SOSContainer: {
    width: '70%',
    backgroundColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: 18,
    borderRadius: 10,
  },
  modalContainer: {
    width: '70%',
    backgroundColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: 18,
    borderRadius: 10,
  },
  SOSTitle: {
    fontSize: 32,
    color: '#323232',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 28,
    color: '#323232',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  SOSSpacer: {
    marginBottom: 10,
  },
  debug: {
    position: 'relative',
    overflow: 'visible',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  GemContainer: {
    // backgroundColor: '#10b981',
    height: gemSize,
    width: gemSize,
  },
  callout: {
    width: 200,
    height: 200,
  },
})

export default map
