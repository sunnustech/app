import { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { Team } from '@/classes/team'

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
    const elapsedMilliseconds = Math.abs(now.getTime() - team.displayTimeOffset())
    const elapsedSeconds = Math.round(elapsedMilliseconds / 1000)
    return secondsToHHMMSS(elapsedSeconds)
  }

  function paused() {
    return secondsToHHMMSS(team.getPausedAt())
  }

  useEffect(() => {
    if (team._timerRunning) {
      const timerId = setInterval(() => setNow(new Date()), 1000)
      return () => {
        clearInterval(timerId)
      }
    }
  })

  return <Text>{team._timerRunning ? tick() : paused()}</Text>
}

export default Timer
