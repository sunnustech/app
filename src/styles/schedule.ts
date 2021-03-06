import { StyleSheet } from 'react-native'
import colors from '@/styles/colors'
import config from './config'

const scorePadding = {
  left: 10,
  top: 10
}

// shadowColor: colors.shadow,
// shadowRadius: 2,
// shadowOpacity: 0.2,
// shadowOffset: { width: 0, height: 5 },
// backgroundColor: colors.white,

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
    // backgroundColor: colors.orange[200],
    borderRadius: config.radius,
    borderBottomColor: colors.gray[200],
    borderBottomWidth: 1,
    paddingHorizontal: scorePadding.left,
    paddingVertical: scorePadding.top,
  },
  eventBgCompleted: {
    width: '90%',
    borderRadius: config.radius,
    borderBottomColor: colors.gray[200],
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.red[300],
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
  scoreWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    left: scorePadding.left,
    top: scorePadding.top,
    height: '100%',
    width: '100%',
    // backgroundColor: colors.red[200],
  },
  scoreContainer: {
    // backgroundColor: colors.purple[200],
  },
  score: {
    fontWeight: '700',
    fontSize: 42,
    color: colors.gray[400],
    opacity: 0.7
  },
  win: {
    color: colors.emerald[400],
    opacity: 0.6,
  },
  participants: {},
  bothParticipantsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: colors.red[100],
  },
  participantContainer: {
    flex: 1,
    // backgroundColor: colors.blue[100],
  },
  vs: {
    fontSize: 15,
    fontWeight: '700',
    color: gray4,
    paddingTop: 2,
    marginHorizontal: 6,
    // backgroundColor: colors.green[100],
  },
  time: {
    fontSize: 20,
    marginBottom: 4,
    fontWeight: '700',
  },
  completedTime: {
    color: colors.gray[400],
  },
  textRight: {
    textAlign: 'right',
  },
  textLeft: {
    textAlign: 'left',
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
  segment: {
    width: '100%',
    justifyContent: 'center',
    // backgroundColor: colors.blue[200],
    flexDirection: 'row',
    marginBottom: 4,
  },
})
