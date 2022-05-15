import { StyleSheet } from 'react-native'
import colors from '@/styles/colors'

// influences all buttons on the Map
const base = {
  size: 56,
  color: colors.white,
}

const mapButtons = StyleSheet.create({
  base: {
    width: base.size,
    height: base.size,
    backgroundColor: base.color,
    borderRadius: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  blue: {
    backgroundColor: colors.blue[400],
  },
  whiteText: {
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
  },
  bottomButton: {
    marginTop: 14,
  },
})

export default mapButtons
