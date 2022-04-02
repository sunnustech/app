/*
 * this will be a suite of functions that SOAR will use to interact with firebase
 */

import push from '@/data/push'
import { pullDoc } from '@/data/pull'
import { TimeApiProps } from '@/types/index'
import { SoarCommand, SoarTeamProps } from '@/types/SOAR'

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
const getSOARProps = async (groupTitle: string): Promise<SoarTeamProps> => {
  // TODO: handle errors on bad pulls
  const data = (await pullDoc({ collection: 'participants', doc: groupTitle }))
    ?.data.SOAR
  return data
}

// start SOAR timer for the first time (flag off)
const start = async (groupTitle: string) => {
  const soarProps = await getSOARProps(groupTitle)
  // checks
  if (soarProps.started) {
    console.warn('This team has already started SOAR!')
    return
  }
  // only continue if team hasn't started SOAR yet.
  const startTime = await getTimeAsync()
  const docs = generatePacket(groupTitle, {
    startTime,
    started: true,
    timerRunning: true,
  })
  push({ collection: 'participants', docs })
}

// pause SOAR timer for the specified team
const pause = async (groupTitle: string) => {
  const soarProps = await getSOARProps(groupTitle)
  // checks
  if (!soarProps.started) {
    console.warn(`${groupTitle} hasn't started SOAR.`)
    return
  }
  if (!soarProps.timerRunning) {
    console.warn(`${groupTitle}'s timer is currently not running.`)
    return
  }
  // only continue if team's timer is running
  const timerEvents = soarProps.timerEvents
  const lastPause = await getTimeAsync()
  timerEvents.push(lastPause)
  const docs = generatePacket(groupTitle, {
    timerRunning: false,
    lastPause,
    timerEvents,
  })
  push({ collection: 'participants', docs })
}

// resume the SOAR timer for the specified team
const resume = async (groupTitle: string) => {
  const soarProps = await getSOARProps(groupTitle)
  // checks
  if (!soarProps.started) {
    console.warn(`${groupTitle} hasn't started SOAR.`)
    return
  }
  if (soarProps.timerRunning) {
    console.warn(`${groupTitle}'s timer is currently already running.`)
    return
  }
  // only continue if team's timer is running
  const timerEvents = soarProps.timerEvents
  const lastResume = await getTimeAsync()
  timerEvents.push(lastResume)
  const docs = generatePacket(groupTitle, {
    timerRunning: true,
    lastResume,
    timerEvents,
  })
  push({ collection: 'participants', docs })
}

// end SOAR timer for the last time (final)
const stopFinal = async (groupTitle: string) => {
  const soarProps = await getSOARProps(groupTitle)
  // checks
  if (!soarProps.started) {
    console.warn(`${groupTitle} hasn't started SOAR.`)
    return
  }
  if (soarProps.stopped) {
    console.warn(`${groupTitle} already completed SOAR.`)
    return
  }
  if (!soarProps.timerRunning) {
    console.warn(`${groupTitle}'s timer still running. Stopping anyways.`)
  }
  // only continue if team hasn't stopped SOAR yet
  const timerEvents = soarProps.timerEvents
  const stopTime = await getTimeAsync()
  timerEvents.push(stopTime)
  const docs = generatePacket(groupTitle, {
    timerRunning: false,
    stopped: true,
    stopTime,
    timerEvents,
  })
  push({ collection: 'participants', docs })
}

const soar: Record<SoarCommand, any> = {
  start,
  pause,
  resume,
  stopFinal,
  fn01: () => true,
  fn02: () => true,
  fn03: () => true,
  fn04: () => true,
  fn05: () => true,
  fn06: () => true,
  fn07: () => true,
  fn08: () => true,
  fn09: () => true,
  fn10: () => true,
  fn11: () => true,
  fn12: () => true,
  fn13: () => true,
  fn14: () => true,
  fn15: () => true,
  fn16: () => true,
  fn17: () => true,
  fn18: () => true,
  fn19: () => true,
  fn20: () => true,
}

export default soar
