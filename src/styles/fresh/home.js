import { StyleSheet } from 'react-native'
import opts from './opts'
import colors from '@/styles/colors'

const allWidths = '70%'
const buttonSize = 50

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },

  headingContainer: {
    height: 50,
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    // backgroundColor: colors.blue[100],
  },
  iconsContainer: {
    height: '100%',
    flexDirection: 'row',
    // backgroundColor: colors.green[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: buttonSize * 0.2,
  },
  headerButton: {
    height: buttonSize,
    width: buttonSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    // backgroundColor: colors.blue[100],
  },

  logoContainer: {
    paddingLeft: 24,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  logo: {
    width: '40%%',
  },
  bodyContainer: {
    flex: 1,
    width: allWidths,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.green[100],
  },

  /* button base */
  seriesButton: {
    width: '100%',
    borderWidth: opts.border,
    padding: 18,
    height: 108,
    borderRadius: opts.radius,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  devButton: {
    width: '100%',
    borderWidth: opts.border,
    padding: 10,
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

  /* modal stuff */
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
    textAlign: 'center',
    color: colors.gray[700],
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  centered: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
})
