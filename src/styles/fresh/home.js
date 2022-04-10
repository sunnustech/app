import { StyleSheet } from 'react-native'
import opts from './opts'
import colors from '@/styles/colors'

function makeAccent(color) {
  return {
    bg: colors[color][300],
    fg: colors[color][600],
    border: colors[color][500],
  }
}

const accents = {
  // bg: 300, fg: 500, border: 600
  SOAR: makeAccent('amber'),
  WSS: makeAccent('sky'),
  TSS: makeAccent('green'),
  DEV: makeAccent('purple'),
  GenerateQR: makeAccent('pink'),
}

export default StyleSheet.create({
  /* containers */
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg
  },
  buttonContainer: {
    width: opts.allWidths,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: accents.SOAR.bg,
    borderColor: accents.SOAR.border,
  },
  TSSbutton: {
    backgroundColor: accents.TSS.bg,
    borderColor: accents.TSS.border,
  },
  WSSbutton: {
    backgroundColor: accents.WSS.bg,
    borderColor: accents.WSS.border,
  },
  DEVbutton: {
    backgroundColor: accents.DEV.bg,
    borderColor: accents.DEV.border,
  },
  GenerateQRbutton: {
    backgroundColor: accents.GenerateQR.bg,
    borderColor: accents.GenerateQR.border,
  },

  /* button text */
  buttonText: {
    fontWeight: '600',
    fontSize: 18,
  },
  SOARbuttonText: {
    color: accents.SOAR.fg,
  },
  WSSbuttonText: {
    color: accents.WSS.fg,
  },
  TSSbuttonText: {
    color: accents.TSS.fg,
  },
  DEVbuttonText: {
    color: accents.DEV.fg,
  },
  GenerateQRbuttonText: {
    color: accents.GenerateQR.fg,
  },
})
