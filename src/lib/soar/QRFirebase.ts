/*
 * this will be a suite of functions that SOAR will use to interact with firebase
 */

import push from '@/data/push'
import { pullDoc } from '@/data/pull'
import { TimeApiProps } from '@/types/index'
import {
  QRStaticCommandProps,
  SoarCommand,
  SOARTimestamp,
  SOARTeamData,
} from '@/types/SOAR'

/* NOTE
 * there will be no game-related error catching done here.
 * all game-related errors are dealth with using Modals,
 * and are hence located at @/screens/QRScreen.tsx
 */

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

const propsAndEvents = async (
  groupTitle: string,
  QR: QRStaticCommandProps
): Promise<[SOARTeamData, Array<SOARTimestamp>, TimeApiProps]> => {
  const [SOARProps, ts] = await Promise.all([
    getSOARProps(groupTitle),
    getTimeAsync(),
  ])
  const allEvents = SOARProps.allEvents
  allEvents.push({ timestamp: ts, QR })
  return [SOARProps, allEvents, ts]
}

// start SOAR timer for the first time (flag off)
const start = async (groupTitle: string, QR: QRStaticCommandProps) => {
  const [_, allEvents, ts] = await propsAndEvents(groupTitle, QR)
  const docs = generatePacket(groupTitle, {
    startTime: ts,
    started: true,
    timerRunning: true,
    allEvents,
  })
  push({ collection: 'participants', docs })
}

// pause SOAR timer for the specified team
const pause = async (groupTitle: string, QR: QRStaticCommandProps) => {
  const [_, allEvents, ts] = await propsAndEvents(groupTitle, QR)
  const docs = generatePacket(groupTitle, {
    timerRunning: false,
    lastPause: ts,
    allEvents,
  })
  push({ collection: 'participants', docs })
}

// resume the SOAR timer for the specified team
const resume = async (groupTitle: string, QR: QRStaticCommandProps) => {
  const [_, allEvents, ts] = await propsAndEvents(groupTitle, QR)
  const docs = generatePacket(groupTitle, {
    timerRunning: true,
    lastResume: ts,
    allEvents,
  })
  push({ collection: 'participants', docs })
}

// end SOAR timer for the last time (final)
const stopFinal = async (groupTitle: string, QR: QRStaticCommandProps) => {
  const [_, allEvents, ts] = await propsAndEvents(groupTitle, QR)

  const docs = generatePacket(groupTitle, {
    timerRunning: false,
    stopped: true,
    stopTime: ts,
    allEvents,
  })
  push({ collection: 'participants', docs })
}

// end SOAR timer for the last time (final)
const completeStage = async (groupTitle: string, QR: QRStaticCommandProps) => {
  const [SOARProps, allEvents, _] = await propsAndEvents(groupTitle, QR)

  const thisStation = QR.station
  const stationsRemaining = SOARProps.stationsRemaining
  const stationsCompleted = SOARProps.stationsCompleted

  stationsRemaining.shift()
  stationsCompleted.push(thisStation)

  const docs = generatePacket(groupTitle, {
    allEvents,
    stationsCompleted,
    stationsRemaining,
  })
  push({ collection: 'participants', docs })
}

const noop = () => {}

const SOAR: Record<SoarCommand, any> = {
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

export default SOAR
