import { StyleSheet } from 'react-native'
import colors from '@/styles/colors'

export default StyleSheet.create({
  /* containers */
  background: {
    flex: 1,
    backgroundColor: colors.orange[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: '60%',
    justifyContent: 'center',
  },
})
