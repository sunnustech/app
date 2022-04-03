/* navigation */
import { createDrawerNavigator } from '@react-navigation/drawer'

/* screens */
import {
  HomeScreen,
  SOARScreen,
  TSSScreen,
  WSSScreen,
  DEVScreen,
  KnockoutTable,
  TimerScreen,
  QRScreen,
} from '@/screens/index'

/* providers */
import { SOARProvider } from '@/contexts/SOARContext'
import { TimerProvider } from '@/contexts/TimerContext'
import { UserProvider } from '@/contexts/UserContext'
import { AuthenticatedPages } from '@/types/navigation'

const Drawer = createDrawerNavigator<AuthenticatedPages>()

const Navigator = () => (
  <Drawer.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    <Drawer.Screen name="SOARScreen" component={SOARScreen} />
    <Drawer.Screen name="TSSScreen" component={TSSScreen} />
    <Drawer.Screen name="WSSScreen" component={WSSScreen} />
    <Drawer.Screen name="DEVScreen" component={DEVScreen} />
    <Drawer.Screen name="KnockoutTableScreen" component={KnockoutTable} />
    <Drawer.Screen name="TimerScreen" component={TimerScreen} />
    <Drawer.Screen name="QRScreen" component={QRScreen} />
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
