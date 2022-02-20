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
import { createNativeStackNavigator } from '@react-navigation/native-stack'

/* sunnus contexts */
import { createSoarCtx } from './src/contexts/SoarContext'

export type RootStackParamList = {
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

const Stack = createNativeStackNavigator<RootStackParamList>()
const [ctx, SoarProvider] = createSoarCtx()
export const SoarContext = ctx

const App = () => {
  return (
    <SoarProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Notifications" component={NotificationScreen} />
          <Stack.Screen name="Database" component={DatabaseScreen} />
          <Stack.Screen name="Scanner" component={ScanScreen} />
          <Stack.Screen name="KnockoutTable" component={KnockoutTable} />
          <Stack.Screen name="Scoreboard" component={ScoreboardScreen} />
          <Stack.Screen name="DummyTest" component={SampleSoarGamePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SoarProvider>
  )
}

export default App
