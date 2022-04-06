/* navigation */
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

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
const TSSTabs = createBottomTabNavigator()

const TSSNavigator = () => (
  <TSSTabs.Navigator>
    <TSSTabs.Screen name="TSSScreen" component={TSSScreen}/>
  </TSSTabs.Navigator>
)

const Navigator = () => (
  <Drawer.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    <Drawer.Screen name="SOARScreen" component={SOARScreen} />
    <Drawer.Screen name="TSSNavigator" component={TSSNavigator} />
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
