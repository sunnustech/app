import { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { timer as styles } from '@/styles/fresh'

type TimerProps = {
  isRunning: boolean
  pausedAt: number
  SOARTimerEvents: Array<number>
}

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
const TimerText = ({
  isRunning,
  pausedAt,
  SOARTimerEvents,
}: TimerProps) => {
  const [elapsed, setElapsed] = useState('')

  function tick() {
    console.debug('tick')
    const now = new Date()
    const sum = SOARTimerEvents.reduce((a, b) => a + b, 0)
    const sign = (sum > 0) ? -1: 1
    const finalSum = Math.abs(sum + sign * now.getTime())
    const displayTime = secondsToHHMMSS(Math.round(finalSum / 1000))
    setElapsed(displayTime)
  }

  useEffect(() => {
    if (isRunning) {
      const timerID = setInterval(() => tick(), 1000)
      // runs on component unmount
      return () => {
        clearInterval(timerID)
      }
    }
  })

  const pauseDisplay = secondsToHHMMSS(Math.round(pausedAt / 1000))

  return <>{isRunning ? elapsed : `-- ${pauseDisplay}`}</>
}

const Timer = ({
  isRunning,
  pausedAt,
  SOARTimerEvents,
}: TimerProps) => {
  return (
    <Text>
      <TimerText
        SOARTimerEvents={SOARTimerEvents}
        isRunning={isRunning}
        pausedAt={pausedAt}
      />
    </Text>
  )
}

export { TimerText }
export default Timer
