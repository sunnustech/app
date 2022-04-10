import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  /* containers */
  container: {
    flex: 1,
    paddingTop: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    marginBottom: 14,
    fontSize: 24,
    fontWeight: '700',
    color: '#4b5563',
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

  numberInputContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },

  numberInputTeamContainer: {
    flex: 1,
    flexDirection: 'column',
    borderColor: '#d4d4d8',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderWidth: 3,
    borderRadius: 6,
  },
  numberInputSpacer: {
    width: 10,
  },

  numberInputTeamNameContainer: {
    height: 48,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 8,
  },
  numberInputTeamName: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
  },
  numberInput: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: '600',
    color: '#4b5563',
    borderRadius: 6,
    backgroundColor: 'white',
    height: 100,
    shadowColor: '#000000',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
  },
})
