import { Camera } from 'react-native-maps'
import { QRStaticCommandProps } from '@/types/SOAR'

export const NUSCoordinates: Camera = {
  center: { latitude: 1.296674, longitude: 103.77639 },
  pitch: 0,
  zoom: 15.3,
  heading: 0,
  altitude: 0,
}

export const emptyQR: QRStaticCommandProps = {
  title: '',
  summary: '',
  action: '',
  command: '',
}

export const invalidQR: QRStaticCommandProps = {
  title: 'invalid QR',
  summary: 'The QR code scanned is not in our index',
  action: 'Continue',
  command: '',
}

export const QRStaticCommands: { [key: string]: QRStaticCommandProps } = {
  start: {
    title: 'start',
    summary: 'Ready to kickstart your adventure?',
    action: "Let's go!",
    command: 'start',
  },
  resume: {
    title: 'resume',
    summary: 'Resume the timer?',
    action: 'Confirm',
    command: 'resume',
  },
  pause: {
    title: 'pause',
    summary: 'Pause the timer?',
    action: 'Confirm',
    command: 'pause',
  },
  stopFinal: {
    title: 'stop',
    summary: 'Stop the timer?',
    action: 'Confirm',
    command: 'stop',
  },
  invalid: {
    title: 'invalid QR',
    summary: 'The QR code you scan is not in our index.',
    action: 'Continue',
    command: '',
  },
}
