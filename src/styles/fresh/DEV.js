import { StyleSheet } from 'react-native'
import colors from '@/styles/colors'
import opts from './opts'

export default StyleSheet.create({
  /* containers */
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingTop: 64,
    paddingBottom: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* button base */
  button: {
    width: '100%',
    backgroundColor: colors.gray[400],
    padding: 18,
    borderRadius: opts.radius,
    marginVertical: 8,
    alignItems: 'center',
  },

  /* button text */
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
})
