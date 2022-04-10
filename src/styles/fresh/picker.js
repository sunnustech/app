import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  pickerContainer: {
    width: '80%',
    height: 64,
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
})
