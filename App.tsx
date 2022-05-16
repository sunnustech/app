/* navigation */
import { NavigationContainer } from '@react-navigation/native'
import { LogBox } from 'react-native'

/* sunnus contexts */
import SunNUS from '@/navigations/index'

const App = () => {
  LogBox.ignoreLogs(['Setting a timer', 'AsyncStorage', 'ViewPropTypes will be'])
  return (
    <NavigationContainer>
      <SunNUS />
    </NavigationContainer>
  )
}

export default App
