import {
  HomeScreen,
  WSSScreen,
  DEVScreen,
  GeneratorScreen,
} from '@/screens/index'
import { SOARContext, SOARProvider } from '@/contexts/SOARContext'
import { TimerProvider } from '@/contexts/TimerContext'
import { UserContext, UserProvider } from '@/contexts/UserContext'
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
import { auth, db } from '@/sunnus/firebase'

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
  const { userState } = useContext(UserContext)
  const [user, setUser] = userState
  const setPhone = safetyOfficerPhoneState[1]
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
      const unsubscribeUser = onSnapshot(
        doc(db, 'users', auth.currentUser?.uid || ''),
        (doc) => {
          const data = doc.data()
          if (data !== undefined) {
            console.debug('firebase updated <user> at', new Date())
            setUser(data)
          }
        }
      )
      return () => {
        console.debug('unfocused AuthStack')
        /* detach firebase listener on unmount */
        unsubscribeFirebase()
        unsubscribeUser()
        console.debug('detach firebase listener on AuthStack')
      }
    }, [])
  )

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
      {(user.role === 'soar-admin' || user.role === 'admin') && (
        <MainStack.Screen name="GeneratorScreen" component={GeneratorScreen} />
      )}
      <MainStack.Screen name="DEVScreen" component={DEVScreen} />
    </MainStack.Navigator>
  )
}

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
