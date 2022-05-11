import { useState } from 'react'
import { Text } from 'react-native'
// import { timer as styles } from '@/styles/fresh'
import { Team } from '@/classes/team'
// import { log } from '@/utils/cli'

const secondsToHHMMSS = (seconds: number): string => {
  if (seconds < 3600) {
    return new Date(seconds * 1000).toISOString().substring(14, 19)
  }
  return new Date(seconds * 1000).toISOString().substring(11, 19)
}

/* start: a JavaScript Date object
 * totalBreak: number of seconds that the team didn't have the timer running
 *
 * only return a <Text/> object
 * make it as no-frills, no-outer dependencies as possible
 */

const Timer = (props: { team: Team }) => {
  const { team } = props
  const [elapsed, setElapsed] = useState('')

  function tick() {
    const now = new Date()
    const finalSum = Math.abs(now.getTime() - team.displayTimeOffset())
    const seconds = Math.round(finalSum / 1000)
    // console.log('timer events', team._timerEvents)
    const displayTime = secondsToHHMMSS(seconds)
    // log.green('tick', seconds)
    setElapsed(displayTime)
  }

  if (team._timerRunning) {
    setInterval(tick, 1000)
  }

  const pauseDisplay = secondsToHHMMSS(Math.round(team.getPausedAt() / 1000))

  return <Text>{team._timerRunning ? elapsed : `-- ${pauseDisplay}`}</Text>
}

export default Timer
