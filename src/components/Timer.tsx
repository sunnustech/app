import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Team } from '@/classes/team'
import { timer as styles } from '../styles/fresh'

const secondsToHHMMSS = (seconds: number): string => {
  if (seconds < 3600) {
    return new Date(seconds * 1000).toISOString().substring(14, 19)
  }
  // trim leading zero for hours
  if (seconds < 36000) {
    return new Date(seconds * 1000).toISOString().substring(12, 19)
  }
  // only supports up to 99 hours
  return new Date(seconds * 1000).toISOString().substring(11, 19)
}

/* start: a JavaScript Date object
 * totalBreak: number of seconds that the team didn't have the timer running
 *
 * only return a <Text/> object
 * make it as no-frills, no-outer dependencies as possible
 */

// function separateSeconds(HMS: string) {
//   const S = HMS.split(':').pop()
//   const re = new RegExp(`:${S}$`)
//   const HM = HMS.replace(re, '')
// }

const SmallSeconds = (props: { HMS: string }) => {
  const S = props.HMS.split(':').pop()
  const re = new RegExp(`:${S}$`)
  const HM = props.HMS.replace(re, '')
  return (
    <View style={styles.smallSecondsContainer}>
      <View style={styles.textContainer}>
        <Text style={[styles.number, styles.hourMinutes]}>{HM}</Text>
        <Text style={[styles.number, styles.seconds]}>{S}</Text>
      </View>
    </View>
  )
}

const Timer = (props: { team: Team }) => {
  const { team } = props
  const [now, setNow] = useState(new Date())

  function tick() {
    const elapsedMilliseconds = Math.abs(
      now.getTime() - team.displayTimeOffset()
    )
    const elapsedSeconds = Math.round(elapsedMilliseconds / 1000)
    const HMS = secondsToHHMMSS(elapsedSeconds)
    return HMS
  }

  function paused() {
    const HMS = secondsToHHMMSS(team.getPausedAt())
    return HMS
  }

  useEffect(() => {
    if (team._timerRunning) {
      const timerId = setInterval(() => setNow(new Date()), 1000)
      return () => {
        clearInterval(timerId)
      }
    }
  })

  return <SmallSeconds HMS={team._timerRunning ? tick() : paused()} />
}

export default Timer
