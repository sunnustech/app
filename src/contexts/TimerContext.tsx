import { createContext, useState, Dispatch, SetStateAction } from 'react'

type TimerContextProps = {
  isActive: boolean
  isPaused: boolean
  contextTime: number
  setIsActive: Dispatch<SetStateAction<boolean>>
  setIsPaused: Dispatch<SetStateAction<boolean>>
  setContextTime: Dispatch<SetStateAction<number>>
}

const createTimerContext = () => {
  const TimerContext = createContext<TimerContextProps>({
    isActive: false,
    isPaused: false,
    contextTime: 0,
    setIsActive: () => {},
    setIsPaused: () => {},
    setContextTime: () => 0,
  })
  const TimerProvider = (props: React.PropsWithChildren<{}>) => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const [isPaused, setIsPaused] = useState<boolean>(false)
    const [contextTime, setContextTime] = useState<number>(0)
    return (
      <TimerContext.Provider
        value={{
          isActive,
          isPaused,
          setIsActive,
          setIsPaused,
          contextTime,
          setContextTime,
        }}
        {...props}
      />
    )
  }
  return [TimerContext, TimerProvider] as const
}

const [TimerContext, TimerProvider] = createTimerContext()
export { TimerContext, TimerProvider }
