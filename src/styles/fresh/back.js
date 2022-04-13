import { StyleSheet } from 'react-native'
import colors from '@/styles/colors'

export default StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    // backgroundColor: colors.blue[200],
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    color: colors.homeFg,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
    width: 50,
    // backgroundColor: colors.green[100],
  },
  text: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.homeFg,
  },
})
