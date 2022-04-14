import { StyleSheet } from 'react-native'
import colors from '@/styles/colors'

const QR = StyleSheet.create({
  /* ==========
   * containers
   * ==========
   */
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: colors.transparent,
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
    backgroundColor: colors.gray[50],
    opacity: 0.7,
    borderRadius: 1000,
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 36,
  },
  pillButtonText: {
    fontWeight: '600',
    color: colors.gray[300],
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
    color: colors.gray[300],
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
})

export default QR
