/* navigation */
import { createDrawerNavigator } from '@react-navigation/drawer'

/* screens */
import {
  HomeScreen,
  SOARScreen,
  WSSScreen,
  DEVScreen,
  QRScreen,
} from '@/screens/index'

/* providers */
import { SOARProvider } from '@/contexts/SOARContext'
import { TimerProvider } from '@/contexts/TimerContext'
import { UserProvider } from '@/contexts/UserContext'
import { AuthenticatedPages } from '@/types/navigation'
import TSSNavigator from '@/navigations/TSSNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Drawer = createDrawerNavigator<AuthenticatedPages>()
const Stack = createNativeStackNavigator()

const Navigator = () => (
  <Drawer.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    <Drawer.Screen name="SOARNavigator" component={SOARNavigator} />
    <Drawer.Screen name="TSSNavigator" component={TSSNavigator} />
    <Drawer.Screen name="WSSScreen" component={WSSScreen} />
    <Drawer.Screen name="DEVScreen" component={DEVScreen} />
  </Drawer.Navigator>
)

const SOARNavigator = () => (
  <Stack.Navigator
    initialRouteName="SOARScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="SOARScreen" component={SOARScreen} />
    <Stack.Screen name="QRScreen" component={QRScreen} />
  </Stack.Navigator>
)

const AuthStack = () => (
  <UserProvider>
    <SOARProvider>
      <TimerProvider>
        <Navigator />
      </TimerProvider>
    </SOARProvider>
  </UserProvider>
)

export default AuthStack
