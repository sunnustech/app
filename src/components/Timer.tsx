import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Team } from '@/classes/team'
import colors from '@/styles/colors'
import { globalStyles } from '@/styles/global'

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

const ProgressBar = (props: { team: Team }) => {
  const done = props.team._stationsCompleted.length
  const notDone = props.team._stationsRemaining.length
  const total = done + notDone
  const percent = (100 * done) / total

  const barStyle = {
    height: 2,
    width: `${percent}%`,
    backgroundColor: colors.emerald[400],
  }
  return (
    <View style={globalStyles.timer.progressContainer}>
      <View style={barStyle} />
    </View>
  )
}

const SmallSeconds = (props: { HMS: string; team: Team }) => {
  const S = props.HMS.split(':').pop()
  const re = new RegExp(`:${S}$`)
  const HM = props.HMS.replace(re, '')
  return (
    <View style={globalStyles.timer.smallSecondsContainer}>
      <View style={globalStyles.timer.textContainer}>
        <Text
          style={[globalStyles.timer.number, globalStyles.timer.hourMinutes]}
        >
          {HM}
        </Text>
        <Text style={[globalStyles.timer.number, globalStyles.timer.seconds]}>
          {S}
        </Text>
      </View>
      <ProgressBar team={props.team} />
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

  // heartbeat of the timer
  useEffect(() => {
    if (team._timerRunning) {
      const timerId = setInterval(() => setNow(new Date()), 1000)
      return () => {
        clearInterval(timerId)
      }
    }
  })

  return (
    <SmallSeconds HMS={team._timerRunning ? tick() : paused()} team={team} />
  )
}

export default Timer
