/* navigation */
import { NavigationContainer } from '@react-navigation/native'

/* sunnus contexts */
import AuthNavigation from './src/navigations/AuthNavigation'

const App = () => {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  )
}

export default App
