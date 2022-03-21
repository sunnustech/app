import { createContext, useState } from 'react'

// Context function to be used
function createTimerContext() {
  // Getters and setters to be used when using context
  var ctx
  function Provider(props: any) {
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(true)
    const [time, setTime] = useState(0)
    ctx = createContext({
      isActive,
      setIsActive,
      isPaused,
      setIsPaused,
      time,
      setTime,
    })
    return (
      <ctx.Provider
        value={{ isActive, setIsActive, isPaused, setIsPaused, time, setTime }}
        {...props}
      />
    )
  }
  // Export a tuple of the default and the functions to use the context
  return [ctx, Provider] as const
}

const [TimerContext, TimerProvider] = createTimerContext()

export { TimerContext, TimerProvider }
