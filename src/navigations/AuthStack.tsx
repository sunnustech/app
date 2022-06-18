import {
  HomeScreen,
  WSSScreen,
  DEVScreen,
  GeneratorScreen,
} from '@/screens/index'
import { SOARContext, SOARProvider } from '@/contexts/SOARContext'
import { TimerProvider } from '@/contexts/TimerContext'
import { UserProvider } from '@/contexts/UserContext'
import { AuthenticatedPages } from '@/types/navigation'
import TSSNavigator from '@/navigations/TSSNavigator'
import SOARNavigator from '@/navigations/SOARNavigator'
import { createStackNavigator } from '@react-navigation/stack'
import { LastProvider } from '@/contexts/LastContext'
import NotificationScreen from '@/screens/NotificationScreen'
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useContext } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/sunnus/firebase'

const MainStack = createStackNavigator<AuthenticatedPages>()

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

const Navigator = () => {
  const { safetyOfficerPhoneState } = useContext(SOARContext)
  const setPhone = safetyOfficerPhoneState[1]

  // runs when component is unfocused, used to detach app from firebase to stop live updates
  useFocusEffect(
    useCallback(() => {
      console.debug('focused on SOAR navigator')
      const unsubscribeFirebase = onSnapshot(
        doc(db, 'shared', 'main'),
        (doc) => {
          const data = doc.data()
          if (data !== undefined) {
            console.debug('firebase updated <main> at', new Date())
            setPhone(data.safetyOfficer)
          }
        }
      )
      return () => {
        console.debug('unfocused AuthStack')
        /* detach firebase listener on unmount */
        unsubscribeFirebase()
        console.debug('detach firebase listener on AuthStack')
      }
    }, [])
  )

  // provides navigation capabilities to different screens
  // edit below to add or remove the ability to navigate to your screen
  return (
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
}

/**
 * Contexts to be used wrapping our navigator
 */
const AuthStack = () => {
  return (
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
}

export default AuthStack
