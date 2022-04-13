import { StyleSheet } from 'react-native'
import colors from '@/styles/colors'

const pageIndicatorSize = 5
const pageIndicatorSpacing = 2

export default StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pagerView: {
    width: '100%',
    height: 100,
  },

  /* match node CSS */
  matchNodeContainer: {
    height: 90,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '80%',
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 6,
    borderRadius: 6,
    shadowColor: colors.shadow,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
  },

  pageIndicatorContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  basePage: {
    marginHorizontal: pageIndicatorSpacing,
    height: pageIndicatorSize,
    width: pageIndicatorSize,
    borderRadius: 100,
    borderColor: colors.transparent,
    borderWidth: 1.4,
  },
  oneInPage: {
    backgroundColor: colors.amber[200],
  },
  bothInPage: {
    backgroundColor: colors.amber[400],
  },
  inProgressPage: {
    backgroundColor: colors.blue[400],
  },
  completedPage: {
    backgroundColor: colors.emerald[400],
  },
  noOnePage: {
    backgroundColor: colors.gray[200],
  },
  activePage: {
    borderColor: colors.gray[700],
  },

  matchNodeRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },

  // last containers
  matchNodeTeam: {
    borderWidth: 2,
    borderColor: colors.transparent,
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.gray[600],
    overflow: 'hidden',
  },

  matchNodeScore: {
    width: 36,
    borderColor: colors.gray[200],
    borderWidth: 2,
    borderRadius: 4,
    fontSize: 16,
    fontWeight: '700',
    color: colors.gray[600],
    textAlign: 'center',
  },

  // empty match node
  emptyMatchNodeScore: {
    width: 36,
    borderColor: colors.transparent,
    borderWidth: 2,
    borderRadius: 4,
    color: colors.transparent,
    textAlign: 'center',
  },
  emptyMatchNodeTeamText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.gray[400],
    textAlign: 'center',
  },
  emptyMatchNodeScoreText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.transparent,
    textAlign: 'center',
  },

  // text only
  matchNodeTeamText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gray[600],
  },
  matchNodeScoreText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gray[600],
    textAlign: 'center',
  },

  displayNone: {
    display: 'none',
  },

  pickerContainer: {
    width: '80%',
    height: 48,
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 6,
    shadowColor: colors.shadow,
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',
  },
  pickerChevronContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 20,
  },
  pickerTextContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  pickerText: {
    width: '100%',
    fontSize: 18,
    color: colors.gray[600],
    fontWeight: '700',
    textAlign: 'center',
  },
  pickerChevron: {
    color: colors.gray[600],
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
