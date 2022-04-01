import { Camera } from 'react-native-maps'
import { QRDynamicCommandProps, QRStaticCommandProps } from '@/types/SOAR'

export const NUSCoordinates: Camera = {
  center: { latitude: 1.296674, longitude: 103.77639 },
  pitch: 0,
  zoom: 15.3,
  heading: 0,
  altitude: 0,
}

export const emptyQR = {
  command: '',
  station: '',
}

export const QRStaticCommands: { [key: string]: QRStaticCommandProps } = {
  start: {
    title: 'start',
    summary: 'Ready to kickstart your adventure?',
    action: "Let's go!",
  },
  resume: {
    title: 'resume',
    summary: 'Resume the timer?',
    action: 'Confirm',
  },
  pause: {
    title: 'pause',
    summary: 'Pause the timer?',
    action: 'Confirm',
  },
  stopFinal: {
    title: 'stop',
    summary: 'Stop the timer?',
    action: 'Confirm',
  },
  invalid: {
    title: 'invalid QR',
    summary: 'The QR code you scan is not in our index.',
    action: 'Continue',
  },
}

export const QRDynamicCommands: { [key: string]: QRDynamicCommandProps } = {
  add: (points) => {
    const packet = {
      title: `+${points}`,
      // TODO: randomize congrats messages
      summary: 'Congratulations, adventurer!',
      action: 'Continue',
    }
    return packet
  },
}
