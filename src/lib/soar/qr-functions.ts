/*
 * this will be a suite of functions that SOAR will use to interact with firebase
 */

import push from '@/data/push'
import { pullDoc } from '@/data/pull'
import { TimeApiProps } from '@/types/index'
import { QRStaticCommandProps, SoarCommand, SOARTeamData } from '@/types/SOAR'
import { Toast } from '@/lib/utils'

const TIMEAPI =
  'https://www.timeapi.io/api/Time/current/zone?timeZone=Asia/Singapore'

/*
 * obtains time from an open-source API on the internet.
 * this is more reliable than using the user's local time.
 */
const getTimeAsync = async (): Promise<TimeApiProps> => {
  const response = await fetch(TIMEAPI)
  const time = await response.json()
  return time
}

const generatePacket = (groupTitle: string, packet: any) => {
  const obj = {
    [groupTitle]: {
      SOAR: packet,
    },
  }
  return obj
}

/*
 * checks if the group has started SOAR or not.
 * This is key because if not the original start time may be overwritten.
 */
const getSOARProps = async (groupTitle: string): Promise<SOARTeamData> => {
  // TODO: handle errors on bad pulls
  const data = (await pullDoc({ collection: 'participants', doc: groupTitle }))
    ?.data.SOAR
  return data
}

// start SOAR timer for the first time (flag off)
const start = async (groupTitle: string, QR: QRStaticCommandProps) => {
  const soarProps = await getSOARProps(groupTitle)
  // checks
  if (soarProps.started) {
    Toast('You have already started SOAR!')
    return
  }
  // only continue if team hasn't started SOAR yet.
  const allEvents = soarProps.allEvents
  const startTime = await getTimeAsync()
  allEvents.push({ timestamp: startTime, QR })
  const docs = generatePacket(groupTitle, {
    startTime,
    started: true,
    timerRunning: true,
    allEvents,
  })
  push({ collection: 'participants', docs })
}

// pause SOAR timer for the specified team
const pause = async (groupTitle: string, QR: QRStaticCommandProps) => {
  const soarProps = await getSOARProps(groupTitle)
  // checks
  if (!soarProps.started) {
    Toast("You haven't started SOAR yet!")
    return
  }
  if (!soarProps.timerRunning) {
    Toast('Your timer is already paused.')
    return
  }
  // only continue if team's timer is running
  const allEvents = soarProps.allEvents
  const lastPause = await getTimeAsync()
  allEvents.push({ timestamp: lastPause, QR })
  const docs = generatePacket(groupTitle, {
    timerRunning: false,
    lastPause,
    allEvents,
  })
  push({ collection: 'participants', docs })
}

// resume the SOAR timer for the specified team
const resume = async (groupTitle: string, QR: QRStaticCommandProps) => {
  const soarProps = await getSOARProps(groupTitle)
  // checks
  if (!soarProps.started) {
    Toast("You haven't started SOAR yet!")
    return
  }
  if (soarProps.timerRunning) {
    console.warn(`${groupTitle}'s timer is currently already running.`)
    Toast('Your timer is already running.')
    return
  }
  // only continue if team's timer is running
  const allEvents = soarProps.allEvents
  const lastResume = await getTimeAsync()
  allEvents.push({ timestamp: lastResume, QR })
  const docs = generatePacket(groupTitle, {
    timerRunning: true,
    lastResume,
    allEvents,
  })
  push({ collection: 'participants', docs })
}

// end SOAR timer for the last time (final)
const stopFinal = async (groupTitle: string, QR: QRStaticCommandProps) => {
  const soarProps = await getSOARProps(groupTitle)
  // checks
  if (!soarProps.started) {
    Toast("You haven't started SOAR yet!")
    return
  }
  if (soarProps.stopped) {
    console.warn(`You have already completed SOAR.`)
    return
  }
  if (!soarProps.timerRunning) {
    console.warn(`${groupTitle}'s timer still running. Stopping anyways.`)
  }
  // only continue if team hasn't stopped SOAR yet
  const allEvents = soarProps.allEvents
  const stopTime = await getTimeAsync()
  allEvents.push({ timestamp: stopTime, QR })
  const docs = generatePacket(groupTitle, {
    timerRunning: false,
    stopped: true,
    stopTime,
    allEvents,
  })
  push({ collection: 'participants', docs })
}

// end SOAR timer for the last time (final)
const completeStage = async (groupTitle: string, QR: QRStaticCommandProps) => {
  const thisStation = QR.station
  const soarProps = await getSOARProps(groupTitle)
  // checks
  if (soarProps.stationsCompleted.includes(thisStation)) {
    Toast('You have already completed this station!')
    return
  }
  if (soarProps.stationsRemaining.length === 0) {
    Toast('You have already completed all stations!')
    return
  }
  const stationsRemaining = soarProps.stationsRemaining
  const correctStation = stationsRemaining.shift()
  if (thisStation !== correctStation) {
    Toast('This is not the right station.')
    return
  }

  // only continue if team hasn't completed this station yet
  const stationsCompleted = soarProps.stationsCompleted
  stationsCompleted.push(thisStation)

  // console.log('completed station:', thisStation)
  const allEvents = soarProps.allEvents
  const newTime = await getTimeAsync()
  allEvents.push({ timestamp: newTime, QR })
  const docs = generatePacket(groupTitle, {
    allEvents,
    stationsCompleted,
    stationsRemaining,
  })
  push({ collection: 'participants', docs })
}

const noop = () => {}

const soar: Record<SoarCommand, any> = {
  start,
  pause,
  resume,
  WrongStation: noop,
  AlreadyCompletedSOAR: noop,
  HaveNotStartedSOAR: noop,
  AlreadyPaused: noop,
  AlreadyResumed: noop,
  AlreadyStartedSOAR: noop,
  stopFinal,
  WarnStopFinal: noop,
  completeStage,
  AlreadyCompletedAllStations: noop,
  AlreadyCompletedStation: noop,
  fn01: noop,
  fn02: noop,
  fn03: noop,
  fn04: noop,
  fn05: noop,
  fn06: noop,
  fn07: noop,
  fn08: noop,
  fn09: noop,
  fn10: noop,
  fn11: noop,
  fn12: noop,
  fn13: noop,
  fn14: noop,
  fn15: noop,
  fn16: noop,
  fn17: noop,
  fn18: noop,
  fn19: noop,
  fn20: noop,
  '': noop,
}

export default soar
