import { StyleSheet } from 'react-native'
import colors from '@/styles/colors'

export default StyleSheet.create({
  /* containers */
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
  },
  smallSecondsContainer: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(28, 28, 28, 0.2)',
  },
  textContainer: {
    flexDirection: 'row',
  },
  number: {
    fontVariant: ['tabular-nums'],
  },
  hourMinutes: {
    color: colors.gray[700],
    fontSize: 36,
    marginRight: 4,
  },
  seconds: {
    color: colors.gray[600],
    paddingTop: 3,
    fontSize: 24,
  },
})
