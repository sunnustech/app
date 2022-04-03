import { Camera } from 'react-native-maps'
import { QRStaticCommandProps, SoarCommand } from '@/types/SOAR'

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
  station: '',
}

export const errorQR: QRStaticCommandProps = {
  title: 'Error',
  summary: '',
  action: 'Okay then',
  command: '',
  station: '',
}

export const invalidQR: QRStaticCommandProps = {
  title: 'invalid QR',
  summary: 'The QR code scanned is not in our index',
  action: 'Continue',
  command: '',
  station: '',
}

export const QRStaticCommands: Record<SoarCommand, QRStaticCommandProps> = {
  start: {
    title: 'start',
    summary: 'Ready to kickstart your adventure?',
    action: "Let's go!",
    command: 'start',
    station: '',
  },
  resume: {
    title: 'resume',
    summary: 'Resume the timer?',
    action: 'Confirm',
    command: 'resume',
    station: '',
  },
  pause: {
    title: 'pause',
    summary: 'Pause the timer?',
    action: 'Confirm',
    command: 'pause',
    station: '',
  },
  stopFinal: {
    title: 'stop',
    summary: 'Stop the timer?',
    action: 'Confirm',
    command: 'stopFinal',
    station: '',
  },
  completeStage: {
    title: 'stage completed!',
    summary: 'Congratuations! You have progressed to the next stage!',
    action: 'Continue',
    command: 'completeStage',
    station: '',
  },
  fn01: emptyQR,
  fn02: emptyQR,
  fn03: emptyQR,
  fn04: emptyQR,
  fn05: emptyQR,
  fn06: emptyQR,
  fn07: emptyQR,
  fn08: emptyQR,
  fn09: emptyQR,
  fn10: emptyQR,
  fn11: emptyQR,
  fn12: emptyQR,
  fn13: emptyQR,
  fn14: emptyQR,
  fn15: emptyQR,
  fn16: emptyQR,
  fn17: emptyQR,
  fn18: emptyQR,
  fn19: emptyQR,
  fn20: emptyQR,
  WrongStationError: errorQR,
  HaveNotStartedSOAR: errorQR,
  AlreadyPaused: errorQR,
  AlreadyCompletedSOAR: errorQR,
  AlreadyResumed: errorQR,
  '': emptyQR,
}
