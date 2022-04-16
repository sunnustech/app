import {
  HomeScreen,
  SOARScreen,
  WSSScreen,
  DEVScreen,
  QRScreen,
  GeneratorScreen,
} from '@/screens/index'
import { SOARProvider } from '@/contexts/SOARContext'
import { TimerProvider } from '@/contexts/TimerContext'
import { UserProvider } from '@/contexts/UserContext'
import { AuthenticatedPages, SOARPages } from '@/types/navigation'
import TSSNavigator from '@/navigations/TSSNavigator'
import { createStackNavigator } from '@react-navigation/stack'
import { LastProvider } from '@/contexts/LastContext'
import NotificationScreen from '@/screens/NotificationScreen'
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types'

const MainStack = createStackNavigator<AuthenticatedPages>()
const SOARStack = createStackNavigator<SOARPages>()

const config: TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1200,
    damping: 100,
    mass: 2,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
}

const Navigator = () => (
  <MainStack.Navigator
    initialRouteName="HomeScreen"
    defaultScreenOptions={{
      transitionSpec: {
        open: config,
        close: config,
      },
    }}
  >
    <MainStack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="NotificationScreen"
      component={NotificationScreen}
      options={{ headerShown: true }}
    />
    <MainStack.Screen
      name="SOARNavigator"
      component={SOARNavigator}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="TSSNavigator"
      component={TSSNavigator}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="WSSScreen"
      component={WSSScreen}
      options={{ headerShown: false }}
    />
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
      options={{ animationEnabled: false }}
    />
    <SOARStack.Screen
      name="QRScreen"
      component={QRScreen}
      options={{ animationEnabled: false }}
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
