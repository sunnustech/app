import { StyleSheet } from 'react-native'

const pageIndicatorSize = 5
const pageIndicatorSpacing = 2

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
  },
  tableContainer: {
    height: '70%',
    width: '100%',
    backgroundColor: '#bbf7d0',
  },
  button: {
    height: 28,
  },
  text: {
    color: 'black',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  pagerView: {
    width: '100%',
    height: 100,
    // backgroundColor: '#c4b5fd',
  },
  text: {
    color: 'black',
    fontSize: 40,
  },

  /* match node CSS */
  matchNodeContainer: {
    height: 90,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '80%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 6,
    borderRadius: 6,
    shadowColor: '#000000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
  },

  pageIndicatorContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  inactivePage: {
    backgroundColor: '#d1d5db',
    marginHorizontal: pageIndicatorSpacing,
    height: pageIndicatorSize,
    width: pageIndicatorSize,
    borderRadius: 100,
  },
  activePage: {
    backgroundColor: '#60a5fa',
    marginHorizontal: pageIndicatorSpacing,
    height: pageIndicatorSize,
    width: pageIndicatorSize,
    borderRadius: 100,
  },

  matchNodeRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: '#c4b5fd',
  },

  // last containers
  matchNodeTeam: {
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0)',
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#4b5563',
    overflow: 'hidden',
    // backgroundColor: '#fde047',
  },
  matchNodeScore: {
    width: 36,
    borderColor: '#e5e7eb',
    borderWidth: 2,
    borderRadius: 4,
    fontSize: 16,
    fontWeight: '700',
    color: '#4b5563',
    textAlign: 'center',
    // backgroundColor: '#86efac',
  },

  // empty match node
  emptyMatchNodeScore: {
    width: 36,
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 2,
    borderRadius: 4,
    color: 'rgba(0,0,0,0)',
    textAlign: 'center',
    // backgroundColor: '#86efac',
  },
  emptyMatchNodeTeamText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(0,0,0,0)',
  },
  emptyMatchNodeScoreText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(0,0,0,0)',
    textAlign: 'center',
  },

  // text only
  matchNodeTeamText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4b5563',
  },
  matchNodeScoreText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4b5563',
    textAlign: 'center',
  },

  displayNone: {
    display: 'none',
  },

  pickerContainer: {
    width: '80%',
    height: 48,
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 6,
    shadowColor: '#000000',
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
    color: '#4b5563',
    fontWeight: '700',
    textAlign: 'center',
  },
  pickerChevron: {
    color: '#4b5563',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
