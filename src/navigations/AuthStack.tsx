/* navigation */
import { createDrawerNavigator } from '@react-navigation/drawer'

/* screens */
import {
  HomeScreen,
  SOARScreen,
  WSSScreen,
  GeneratorScreen,
  DEVScreen,
} from '@/screens/index'

/* providers */
import { SOARProvider } from '@/contexts/SOARContext'
import { TimerProvider } from '@/contexts/TimerContext'
import { UserProvider } from '@/contexts/UserContext'
import { AuthenticatedPages } from '@/types/navigation'
import TSSNavigator from '@/navigations/TSSNavigator'

const Drawer = createDrawerNavigator<AuthenticatedPages>()

const Navigator = () => (
  <Drawer.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    <Drawer.Screen name="SOARScreen" component={SOARScreen} />
    <Drawer.Screen name="TSSNavigator" component={TSSNavigator} />
    <Drawer.Screen name="WSSScreen" component={WSSScreen} />
    <Drawer.Screen name="GeneratorScreen" component={GeneratorScreen} />
    <Drawer.Screen name="DEVScreen" component={DEVScreen} />
  </Drawer.Navigator>
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
