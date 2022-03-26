import { Text } from 'react-native'
import { map as styles } from '@/styles/fresh'
import { useEffect, useContext, useState } from 'react'
import { TimerContext } from '@/contexts/TimerContext'

const Timer = () => {
  const { isActive, isPaused, contextTime, setContextTime } =
    useContext(TimerContext)
  const [displayTime, setDisplayTime] = useState(0)

  useEffect(() => {
    let interval: any

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setDisplayTime((displayTime) => displayTime + 10)
      }, 10)
      setContextTime(displayTime)
    } else {
      setContextTime(displayTime)
      clearInterval(interval)
    }
    if (contextTime === -1) {
      setDisplayTime(0)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isActive, isPaused, contextTime])

  return <Text style={styles.timerText}>{displayTime}</Text>
}

export default Timer
