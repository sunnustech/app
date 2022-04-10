import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  /* containers */
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    marginBottom: 24,
    fontSize: 24,
    fontWeight: "700",
    color: '#4b5563'
  },

  /* picker stuff */
  confirmContainer: {
    marginTop: 24,
    width: '80%',
    height: 64,
    backgroundColor: '#10b981',
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
  confirmTextContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  confirmText: {
    width: '100%',
    fontSize: 18,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
})
