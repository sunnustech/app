import { StyleSheet } from 'react-native'

const QR = StyleSheet.create({
  /* ==========
   * containers
   * ==========
   */
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0)',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  centered: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  pillButton: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 1000,
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 36,
  },
  pillButtonText: {
    fontWeight: '600',
    color: '#323232',
    textAlign: 'center',
  },
  modalContainer: {
    width: '70%',
    backgroundColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: 18,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 28,
    color: '#323232',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
})

export default QR
