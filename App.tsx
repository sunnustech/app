/* navigation */
import { NavigationContainer } from '@react-navigation/native'
import { LogBox } from 'react-native'

/* sunnus contexts */
import SunNUS from '@/navigations/index'
LogBox.ignoreLogs(['Setting a timer', 'AsyncStorage has been'])

const App = () => {
  return (
    <NavigationContainer>
      <SunNUS />
    </NavigationContainer>
  )
}

export default App
