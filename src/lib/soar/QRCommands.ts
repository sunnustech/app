import { QRCommandProps, SOARCommand } from '@/types/SOAR'

export const emptyQR: QRCommandProps = {
  title: '',
  summary: '',
  action: '',
  command: '',
  station: '',
}

export const errorQR: QRCommandProps = {
  title: 'Error',
  summary: '',
  action: 'Okay then',
  command: '',
  station: '',
}

export const invalidQR: QRCommandProps = {
  title: 'invalid QR',
  summary: 'The QR code scanned is not in our index',
  action: 'Continue',
  command: '',
  station: '',
}

export const QRCommands: Record<SOARCommand, QRCommandProps> = {
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
    summary: '',
    action: 'Continue',
    command: 'completeStage',
    station: '',
  },
  WrongStation: {
    title: 'Wrong station.',
    summary: 'Oops. This is not the correct station.',
    action: 'Continue',
    command: '',
    station: '',
  },
  AlreadyStartedSOAR: {
    title: 'Already started.',
    summary:
      'Oops. Your team has already started SOAR. There can only be one start!',
    action: 'Continue',
    command: '',
    station: '',
  },
  HaveNotStartedSOAR: {
    title: "Haven't started.",
    summary:
      'Oops. You have not started SOAR yet. Ask your facil for the starting QR instead.',
    action: 'Continue',
    command: '',
    station: '',
  },
  AlreadyPaused: {
    title: 'Already paused.',
    summary: '',
    action: 'Continue',
    command: '',
    station: '',
  },
  AlreadyResumed: {
    title: 'Already resumed.',
    summary: 'Your timer is already running.',
    action: 'Continue',
    command: '',
    station: '',
  },
  AlreadyCompletedSOAR: {
    title: 'Already completed.',
    summary:
      'You have already completed SOAR. Hope you enjoyed it, and see you again next year!',
    action: 'Continue',
    command: '',
    station: '',
  },
  AlreadyCompletedAllStations: {
    title: 'Already completed all stations.',
    summary: "All that's left is to stop the timer!",
    action: 'Confirm',
    command: '',
    station: '',
  },
  AlreadyCompletedStation: {
    title: 'Already completed station.',
    summary: 'You can proceed to the next station.',
    action: 'Continue',
    command: '',
    station: '',
  },
  WarnStopFinal: {
    title: 'stop',
    summary: 'Stop the timer? Note that your timer is paused.',
    action: 'Confirm',
    command: 'stopFinal',
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
  '': emptyQR,
}
