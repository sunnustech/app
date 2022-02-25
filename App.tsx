import { NavigationContainer } from '@react-navigation/native'
import { createNativeDrawerNavigator } from '@react-navigation/native-stack'
/* sunnus screens */
import HomeScreen from '@/screens/HomeScreen'
import LoginScreen from '@/screens/LoginScreen'
import MapScreen from '@/screens/MapScreen'
import NotificationScreen from '@/screens/NotificationScreen'
import DatabaseScreen from '@/screens/DatabaseScreen'
import ScanScreen from './src/screens/ScanScreen'
import SampleSoarGamePage from './src/screens/SampleSoarGamePage'
import KnockoutTable from './src/screens/KnockoutTable'
import ScoreboardScreen from './src/screens/ScoreboardScreen'

/* navigation */
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

/* sunnus contexts */
import { createSoarCtx } from './src/contexts/SoarContext'

export type RootDrawerParamList = {
  Login: undefined
  Home: undefined
  Map: undefined
  Notifications: undefined
  Database: undefined
  Scanner: undefined
  Scoreboard: undefined
  KnockoutTable: undefined

  // Just a TEST, will be deleted or refined later
  DummyTest: undefined
}
// const Stack = createNativeStackNavigator<RootStackParamList>()

const [ctx, SoarProvider] = createSoarCtx()
export const SoarContext = ctx

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
