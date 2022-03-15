/* navigation */
import { NavigationContainer } from '@react-navigation/native'

/* sunnus contexts */
import { SoarProvider } from '@/contexts/SoarContext'
import AuthNavigation from './src/navigations/AuthNavigation'

const App = () => {
  return (
    <SoarProvider>
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    </SoarProvider>
  )
}

export default App
