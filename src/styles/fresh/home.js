import { StyleSheet } from 'react-native'
import opts from './opts'

const colors = {
  // taken from https://tailwindcss.com/docs/customizing-colors
  // bg: 300, fg: 500, border: 600
  SOAR: {
    bg: '#fcd34d',
    border: '#f59e0b',
    fg: '#d97706',
  },
  WSS: {
    bg: '#7dd3fc',
    border: '#0ea5e9',
    fg: '#0284c7',
  },
  TSS: {
    bg: '#86efac',
    border: '#22c55e',
    fg: '#22c55e',
  },
}

export default StyleSheet.create({
  /* containers */
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: opts.allWidths,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: opts.allWidths,
    marginBottom: opts.marginBottom,
  },

  image: {
    marginBottom: opts.marginBottom,
    width: 244,
    height: 180,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: opts.border,
    borderColor: '#e5e7eb',
    paddingVertical: 10,
    fontWeight: '600',
    borderRadius: opts.radius,
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  /* button base */
  button: {
    width: '100%',
    borderWidth: opts.border,
    padding: 18,
    borderRadius: opts.radius,
    marginVertical: 8,
    alignItems: 'center',
  },
  SOARbutton: {
    backgroundColor: colors.SOAR.bg,
    borderColor: colors.SOAR.border,
  },
  TSSbutton: {
    backgroundColor: colors.TSS.bg,
    borderColor: colors.TSS.border,
  },
  WSSbutton: {
    backgroundColor: colors.WSS.bg,
    borderColor: colors.WSS.border,
  },

  /* button text */
  buttonText: {
    fontWeight: '600',
    fontSize: 18,
  },
  SOARbuttonText: {
    color: colors.SOAR.fg,
  },
  WSSbuttonText: {
    color: colors.WSS.fg,
  },
  TSSbuttonText: {
    color: colors.TSS.fg,
  },
})
