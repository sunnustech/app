import { StyleSheet } from 'react-native'
import colors from '@/styles/colors'
import opts from './opts'

const gray3 = colors.gray[300]
const gray4 = colors.gray[400]
const gray5 = colors.gray[500]
const gray6 = colors.gray[600]

export default StyleSheet.create({
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* containers */
  container: {
    alignItems: 'center',
    // backgroundColor: colors.green[100],
  },

  scrollContainer: {
    width: '100%',
    // backgroundColor: colors.blue[200],
  },

  eventBg: {
    width: '90%',
    borderRadius: opts.radius,
    // shadowColor: colors.shadow,
    // shadowRadius: 2,
    // shadowOpacity: 0.2,
    // shadowOffset: { width: 0, height: 5 },
    // backgroundColor: colors.white,
    borderBottomColor: colors.gray[200],
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  text: {
    fontWeight: '600',
    fontSize: 18,
    color: gray6,
    textAlign: 'center',
    marginBottom: 2,
    // backgroundColor: colors.green[100],
  },
  sport: {
    fontWeight: '700',
  },
  venue: {
    fontSize: 16,
    color: gray4,
  },
  court: {
    fontSize: 16,
    color: gray5,
  },
  round: {},
  participants: {},
  vs: {
    fontSize: 15,
    fontWeight: '700',
    color: gray4,
    paddingBottom: 10,
    // backgroundColor: colors.green[100],
  },
  time: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: '700',
  },
})
