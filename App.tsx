/* navigation */
import { NavigationContainer } from '@react-navigation/native'

/* sunnus contexts */
import { SoarProvider } from '@/contexts/SoarContext'
import { TimerProvider } from '@/contexts/TimerContext'
import { UserProvider } from './src/contexts/UserContext'
import AuthNavigation from './src/navigations/AuthNavigation'

const App = () => {
  return (
    <UserProvider>
      <SoarProvider>
        <TimerProvider>
          <NavigationContainer>
            <AuthNavigation />
          </NavigationContainer>
        </TimerProvider>
      </SoarProvider>
    </UserProvider>
  )
}

export default App
