import { useEffect, useState } from 'react'
import { Text } from 'react-native'
// import { timer as styles } from '@/styles/fresh'
import { Team } from '@/classes/team'
import { log } from '@/utils/cli'

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
  const [now, setNow] = useState(new Date())

  function tick() {
    const finalSum = Math.abs(now.getTime() - team.displayTimeOffset())
    const seconds = Math.round(finalSum / 1000)
    const displayTime = secondsToHHMMSS(seconds)
    log.green('tick', seconds, now.toLocaleTimeString())
    return displayTime
  }

  useEffect(() => {
    if (team._timerRunning) {
      const timerId = setInterval(() => setNow(new Date()), 1000)
      return () => {
        clearInterval(timerId)
      }
    }
  })

  const pauseDisplay = secondsToHHMMSS(Math.round(team.getPausedAt() / 1000))

  return <Text>{team._timerRunning ? tick() : `-- ${pauseDisplay}`}</Text>
}

export default Timer
