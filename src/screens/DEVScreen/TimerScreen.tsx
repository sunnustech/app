import { KeyboardAvoidingView, Text } from 'react-native'

/* sunnus components */
import { timer as styles } from '@/styles/fresh'
import { useEffect, useState } from 'react'

const secondsToHHMMSS = (seconds: number): string => {
  if (seconds < 3600) {
    return new Date(seconds * 1000).toISOString().substring(14, 19)
  }
  return new Date(seconds * 1000).toISOString().substring(11, 19)
}

/* start: a JavaScript Date object
 * totalBreak: number of seconds that the team didn't have the timer running
 */
const Clock = ({ start, totalBreak }: { start: Date; totalBreak: number }) => {
  const [elapsed, setElapsed] = useState<any>('')

  function tick() {
    const now = new Date()
    const totalSeconds = Math.round(
      (now.getTime() - start.getTime()) / 1000
    )
    const afterBreaks = totalSeconds - totalBreak
    const displayTime = secondsToHHMMSS(afterBreaks)
    setElapsed(displayTime)
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)
    return () => {
      clearInterval(timerID)
    }
  })

  return <Text>Time since start: {elapsed}</Text>
}

const TimerScreen = () => {
  const start = new Date(2022, 3, 5, 21, 50)
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text>
        started at: {start.toLocaleTimeString()}, {start.toLocaleDateString()}
      </Text>
      <Clock start={start} totalBreak={0} />
    </KeyboardAvoidingView>
  )
}

export default TimerScreen
