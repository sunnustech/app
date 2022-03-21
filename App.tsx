/* navigation */
import { NavigationContainer } from '@react-navigation/native'

/* sunnus contexts */
import { SoarProvider } from '@/contexts/SoarContext'
import AuthNavigation from './src/navigations/AuthNavigation'
import { createContext, useState, Dispatch, SetStateAction } from 'react'

type TimerContextProps = {
  isActive: boolean
  isPaused: boolean
  contextTime: number
  setIsActive: Dispatch<SetStateAction<boolean>>
  setIsPaused: Dispatch<SetStateAction<boolean>>
  setContextTime: Dispatch<SetStateAction<number>>
}

export const TimerContext = createContext<TimerContextProps>({
  isActive: false,
  isPaused: false,
  contextTime: 0,
  setIsActive: () => {},
  setIsPaused: () => {},
  setContextTime: () => 0,
})

const App = () => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [contextTime, setContextTime] = useState<number>(0)
  return (
    <SoarProvider>
      <TimerContext.Provider
        value={{
          isActive,
          isPaused,
          setIsActive,
          setIsPaused,
          contextTime,
          setContextTime,
        }}
      >
        <NavigationContainer>
          <AuthNavigation />
        </NavigationContainer>
      </TimerContext.Provider>
    </SoarProvider>
  )
}

export default App
