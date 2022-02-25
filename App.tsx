/* sunnus screens */
import HomeScreen from '@/screens/HomeScreen'
import LoginScreen from '@/screens/LoginScreen'
import MapScreen from '@/screens/MapScreen'
import NotificationScreen from '@/screens/NotificationScreen'
import DatabaseScreen from '@/screens/DatabaseScreen'
import ScanScreen from '@/screens/ScanScreen'
import SampleSoarGamePage from '@/screens/SampleSoarGamePage'
import KnockoutTable from '@/screens/KnockoutTable'
import ScoreboardScreen from '@/screens/ScoreboardScreen'

/* navigation */
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

/* sunnus contexts */
import { SoarProvider } from '@/contexts/SoarContext'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <SoarProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Map" component={MapScreen} />
          <Drawer.Screen name="Notifications" component={NotificationScreen} />
          <Drawer.Screen name="Database" component={DatabaseScreen} />
          <Drawer.Screen name="Scanner" component={ScanScreen} />
          <Drawer.Screen name="DummyTest" component={SampleSoarGamePage} />
          <Drawer.Screen name="Scoreboard" component={ScoreboardScreen} />
          <Drawer.Screen name="KnockoutTable" component={KnockoutTable} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SoarProvider>
  )
}

export default App
