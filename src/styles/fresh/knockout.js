import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
    width: '100%',
  },
  text: {
    color: 'black',
    fontSize: 40,
  },

  /* match node CSS */
  matchNodeContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 6,
    shadowColor: '#000000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
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
})
