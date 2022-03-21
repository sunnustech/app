/* navigation */
import { NavigationContainer } from '@react-navigation/native'

/* sunnus contexts */
import { SoarProvider } from '@/contexts/SoarContext'
import { TimerProvider } from '@/contexts/TimerContext'
import AuthNavigation from './src/navigations/AuthNavigation'

const App = () => {
  return (
    <SoarProvider>
      <TimerProvider>
        <NavigationContainer>
          <AuthNavigation />
        </NavigationContainer>
      </TimerProvider>
    </SoarProvider>
  )
}

export default App
