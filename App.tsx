/* sunnus screens */
import HomeScreen from '@/screens/HomeScreen'
import LoginScreen from '@/screens/LoginScreen'
import MapScreen from '@/screens/MapScreen'
import NotificationScreen from '@/screens/NotificationScreen'
import DatabaseScreen from '@/screens/DatabaseScreen'
import ScanScreen from '@/screens/ScanScreen'
import SampleSoarGamePage from '@/screens/SampleSoarGamePage'
import KnockoutTable from '@/screens/KnockoutTable'
import KnockoutTree from '@/screens/KnockoutTree'
import ScoreboardScreen from '@/screens/ScoreboardScreen'

/* navigation */
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

/* sunnus contexts */
import { SoarProvider } from '@/contexts/SoarContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

const Home = () => (
  <Drawer.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Drawer.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        gestureEnabled: false,
      }}
    />
    <Drawer.Screen name="MapScreen" component={MapScreen} />
    <Drawer.Screen name="NotificationScreen" component={NotificationScreen} />
    <Drawer.Screen name="DatabaseScreen" component={DatabaseScreen} />
    <Drawer.Screen name="ScanScreen" component={ScanScreen} />
    <Drawer.Screen name="SampleSoarGamePage" component={SampleSoarGamePage} />
    <Drawer.Screen name="ScoreboardScreen" component={ScoreboardScreen} />
    <Drawer.Screen name="KnockoutTable" component={KnockoutTable} />
    <Drawer.Screen name="KnockoutTree" component={KnockoutTree} />
  </Drawer.Navigator>
)

const App = () => {
  return (
    <SoarProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerBackVisible: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SoarProvider>
  )
}

export default App
