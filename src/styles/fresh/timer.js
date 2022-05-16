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
    backgroundColor: 'rgba(255,255,255,0.9)',
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(28, 28, 28, 0.2)',
    overflow: 'hidden'
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
    fontWeight: '500',
  },
  seconds: {
    fontWeight: '400',
    color: colors.gray[600],
    paddingTop: 3,
    fontSize: 24,
  },
  progressContainer: {
    height: 2,
    marginBottom: -2,
    width: '100%',
  },
  progressBar: {
    height: 2,
    width: '20%',
    backgroundColor: colors.emerald[300],
  }
})
