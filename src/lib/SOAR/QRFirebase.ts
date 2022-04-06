/*
 * this will be a suite of functions that SOAR will use to interact with firebase
 */

import push from '@/data/push'
import { pullDoc } from '@/data/pull'
import { TimeApiProps } from '@/types/index'
import { QRCommandProps, SOARCommand, SOARTimestamp } from '@/types/SOAR'
import { db } from '@/sunnus/firebase'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { Group } from '@/types/participants'

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
const getSOARProps = async (groupTitle: string): Promise<Group> => {
  // TODO: handle errors on bad pulls
  const data = (await pullDoc({ collection: 'participants', doc: groupTitle }))
    ?.data
  return data
}

const propsAndEvents = async (
  groupTitle: string,
  QR: QRCommandProps
): Promise<[Group, Array<SOARTimestamp>, number]> => {
  const [teamData, time] = await Promise.all([
    getSOARProps(groupTitle),
    getTimeAsync(),
  ])
  const allEvents = teamData.SOAR.allEvents
  const timestamp = new Date(time.dateTime).getTime()
  allEvents.push({ timestamp, QR })
  return [teamData, allEvents, timestamp]
}

/* ╭─────────╮
 * │  START	 │
 * ╰─────────╯
 */
const start = async (groupTitle: string, QR: QRCommandProps) => {
  console.log(`-- START @ ${groupTitle} --`)
  const [teamData, allEvents, ts] = await propsAndEvents(groupTitle, QR)

  const SOAR = teamData.SOAR
  SOAR.startTime = ts
  SOAR.started = true
  SOAR.timerRunning = true
  SOAR.allEvents = allEvents

  updateDoc(doc(db, 'participants', groupTitle), {
    SOARTimerEvents: [ts],
    SOARStart: ts,
    SOAR,
  })
}

/* ╭────────╮
 * │  STOP  │
 * ╰────────╯
 */
const stopFinal = async (groupTitle: string, QR: QRCommandProps) => {
  const [teamData, allEvents, ts] = await propsAndEvents(groupTitle, QR)

  if (teamData.SOAR.stopped) {
    console.log('SOAR is already completed.')
    return
  }

  const dbSum = teamData.SOARTimerEvents.reduce((a, b) => a + b, 0)
  const SOARPausedAt = ts - dbSum

  const SOAR = teamData.SOAR
  SOAR.stopTime = ts
  SOAR.stopped = true
  SOAR.timerRunning = false
  SOAR.allEvents = allEvents


  updateDoc(doc(db, 'participants', groupTitle), {
    SOARTimerEvents: arrayUnion(-ts),
    SOARPausedAt,
    SOAR,
  })
}

/* ╭─────────╮
 * │  PAUSE	 │
 * ╰─────────╯
 */
const pause = async (groupTitle: string, QR: QRCommandProps) => {
  console.log(`-- PAUSE @ ${groupTitle} --`)
  const [teamData, allEvents, ts] = await propsAndEvents(groupTitle, QR)

  const ev = teamData.SOARTimerEvents
  if (ev[ev.length - 1] < 0) {
    console.log('timer already paused')
    return
  }

  const dbSum = teamData.SOARTimerEvents.reduce((a, b) => a + b, 0)
  const SOARPausedAt = ts - dbSum

  const SOAR = teamData.SOAR
  SOAR.timerRunning = false
  SOAR.allEvents = allEvents

  updateDoc(doc(db, 'participants', groupTitle), {
    SOARTimerEvents: arrayUnion(-ts),
    SOARPausedAt,
    SOAR,
  })
}

/* ╭──────────╮
 * │  RESUME  │
 * ╰──────────╯
 */
const resume = async (groupTitle: string, QR: QRCommandProps) => {
  console.log(`-- RESUME @ ${groupTitle} --`)
  const [teamData, allEvents, ts] = await propsAndEvents(groupTitle, QR)

  const ev = teamData.SOARTimerEvents
  if (ev[ev.length - 1] > 0) {
    console.log('timer already running')
    return
  }

  const SOAR = teamData.SOAR
  SOAR.timerRunning = true
  SOAR.allEvents = allEvents

  updateDoc(doc(db, 'participants', groupTitle), {
    SOARTimerEvents: arrayUnion(ts),
    SOAR,
  })
}

// end SOAR timer for the last time (final)
const completeStage = async (groupTitle: string, QR: QRCommandProps) => {
  const [teamProps, allEvents, _] = await propsAndEvents(groupTitle, QR)

  const thisStation = QR.station
  const stationsRemaining = teamProps.SOAR.stationsRemaining
  const stationsCompleted = teamProps.SOAR.stationsCompleted

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

const SOAR: Record<SOARCommand, any> = {
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
