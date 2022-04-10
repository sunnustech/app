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

  /* buttons below */
  bottomAreaButtonContainer: {
    width: '80%',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  baseButton: {
    flex: 1,
    marginTop: 24,
    height: 64,
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
    borderWidth: 4,
    borderColor: 'rgba(0,0,0,0)',
  },
  confirmButton: {
    backgroundColor: '#10b981',
  },
  confirmText: {
    color: 'white',
  },
  backButton: {
    backgroundColor: '#f87171',
  },
  backText: {
    borderColor: '#6b7280',
    color: 'white',
  },
  pushButton: {
    backgroundColor: '#10b981',
  },
  pushText: {
    color: 'white',
  },

  /* bottom button texts */
  buttonTextContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonBaseText: {
    width: '100%',
    fontSize: 18,
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
