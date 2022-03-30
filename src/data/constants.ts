import { Camera } from 'react-native-maps'
import { QRMapProps } from '@/types/SOAR'

const NUSCoordinates: Camera = {
  center: { latitude: 1.296674, longitude: 103.77639 },
  pitch: 0,
  zoom: 15.3,
  heading: 0,
  altitude: 0,
}

const QRMap: { [key: string]: QRMapProps } = {
  oja0WXlI1I: {
    command: 'start',
    summary: 'Ready to kickstart your adventure?',
    action: "Let's go!",
  },
  k8Z9XZOTxL: {
    command: 'pause',
    summary: 'Pause the timer?',
    action: 'Confirm',
  },
  rgQgvDuD6U: {
    command: 'stop',
    summary: 'Stop the timer?',
    action: 'Confirm',
  },
  IlT9sbpzue: {
    command: '+10',
    // TODO: randomize congrats messages
    summary: 'Congratulations, adventurer!',
    action: 'Continue',
  },
  W1JInblGvW: {
    command: '',
    summary: '',
    action: '',
  },
  A7vpkpBYsb: {
    command: '',
    summary: '',
    action: '',
  },
  XNZyFSrxWz: {
    command: '',
    summary: '',
    action: '',
  },
  dKFPQL2kmA: {
    command: '',
    summary: '',
    action: '',
  },
  Puy1T6pygv: {
    command: '',
    summary: '',
    action: '',
  },
  l48mSusGrz: {
    command: '',
    summary: '',
    action: '',
  },
}

export { NUSCoordinates, QRMap }
