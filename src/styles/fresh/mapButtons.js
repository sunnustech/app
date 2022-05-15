import { StyleSheet } from 'react-native'
import colors from '@/styles/colors'

const sideButton = {
  size: 56,
  color: colors.white,
}

const backButton = {
  size: sideButton.size - 8,
}

const mapButtons = StyleSheet.create({
  mapTopContainer: {
    flex: 1,
    alignItems: 'flex-end',
    // backgroundColor: colors.purple[200],
  },
  mapBottomContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  mapRightContainer: {
    alignItems: 'flex-end',
  },
  mapLeftContainer: {
    flex: 1,
  },
  mapSideButton: {
    width: sideButton.size,
    height: sideButton.size,
    backgroundColor: sideButton.color,
    borderRadius: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  mapTopButton: {
    marginBottom: 14,
  },
  mapActivatedButton: {
    backgroundColor: colors.blue[400],
  },
  mapGoToSchoolButton: {
    backgroundColor: colors.blue[400],
  },
  mapGoToSchoolText: {
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
  },
  mapBottomButton: {
    marginTop: 14,
  },
  mapNavigationButton: {
    width: backButton.size,
    height: backButton.size,
  },
})

export default mapButtons
