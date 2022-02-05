import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '@/screens/HomeScreen'
import LoginScreen from '@/screens/LoginScreen'
import MapScreen from '@/screens/MapScreen'
import NotificationScreen from '@/screens/NotificationScreen'
import DatabaseScreen from '@/screens/DatabaseScreen'
import ScanScreen from './src/screens/ScanScreen'
import SampleSoarGamePage from './src/screens/SampleSoarGamePage'
import { createSoarCtx } from './src/contexts/SoarContext'
import KnockoutTable from './src/screens/KnockoutTable'

export type RootStackParamList = {
  Home: undefined
  Login: undefined
  Map: undefined
  Notifications: undefined
  Database: undefined
  Scanner: undefined
  KnockoutTable: undefined

  // Just a TEST, will be deleted or refined later
  DummyTest: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const [ctx, SoarProvider] = createSoarCtx(0)
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
          <Stack.Screen name="DummyTest" component={SampleSoarGamePage} />
          <Stack.Screen name="KnockoutTable" component={KnockoutTable} />
        </Stack.Navigator>
      </NavigationContainer>
    </SoarProvider>
  )
}

export default App
