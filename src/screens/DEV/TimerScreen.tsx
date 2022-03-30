import { KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native'

/* sunnus components */
import { timer as styles } from '@/styles/fresh'
import { useContext } from 'react'
import Timer from '@/components/SOAR/Timer'
import { TimerContext } from '@/contexts/TimerContext'

const KnockoutTable = () => {
  const { setIsActive, isPaused, setIsPaused, setContextTime } =
    useContext(TimerContext)

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  const handlePauseResume = () => {
    console.log('pressed pause') // perma
    setIsPaused(!isPaused)
  }

  const handleReset = () => {
    setContextTime(-1)
    setIsActive(false)
  }

  const Button = ({ onPress, children, containerStyle, textStyle }: any) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, containerStyle]}
      >
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Timer />
      <Button onPress={handleStart}>Start</Button>
      <Button onPress={handlePauseResume}>Pause</Button>
      <Button onPress={handleReset}>Reset</Button>
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
