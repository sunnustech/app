/* navigation */
import { createDrawerNavigator } from '@react-navigation/drawer'

/* screens */
import {
  HomeScreen,
  SOARScreen,
  WSSScreen,
  DEVScreen,
  QRScreen,
  GeneratorScreen,
} from '@/screens/index'

/* providers */
import { SOARProvider } from '@/contexts/SOARContext'
import { TimerProvider } from '@/contexts/TimerContext'
import { UserProvider } from '@/contexts/UserContext'
import { AuthenticatedPages } from '@/types/navigation'
import TSSNavigator from '@/navigations/TSSNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LastProvider } from '@/contexts/LastContext'

const MainStack = createNativeStackNavigator<AuthenticatedPages>()
const SOARStack = createNativeStackNavigator()

const Navigator = () => (
  <MainStack.Navigator
    initialRouteName="HomeScreen"
    // screenOptions={{ headerShown: false }}
  >
    <MainStack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="SOARNavigator"
      component={SOARNavigator}
      options={{ headerShown: false }}
    />
    <MainStack.Screen name="TSSNavigator" component={TSSNavigator} />
    <MainStack.Screen name="WSSScreen" component={WSSScreen} />
    <MainStack.Screen name="GeneratorScreen" component={GeneratorScreen} />
    <MainStack.Screen name="DEVScreen" component={DEVScreen} />
  </MainStack.Navigator>
)

const SOARNavigator = () => (
  <SOARStack.Navigator
    initialRouteName="SOARScreen"
    screenOptions={{ headerShown: false }}
  >
    <SOARStack.Screen
      name="SOARScreen"
      component={SOARScreen}
      options={{ animation: 'none' }}
    />
    <SOARStack.Screen
      name="QRScreen"
      component={QRScreen}
      options={{ animation: 'none' }}
    />
  </SOARStack.Navigator>
)

const AuthStack = () => (
  <UserProvider>
    <SOARProvider>
      <TimerProvider>
        <LastProvider>
          <Navigator />
        </LastProvider>
      </TimerProvider>
    </SOARProvider>
  </UserProvider>
)

export default AuthStack
