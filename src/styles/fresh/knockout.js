import { StyleSheet } from 'react-native'
import opts from './opts'

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
  matchNodeContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 6,
    shadowColor: '#000000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
  },
  matchNodeText: {
    fontSize: 16,
    color: '#323232',
  },
})
