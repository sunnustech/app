import { useEffect, useState } from 'react'

/* firebase */
import { onAuthStateChanged } from 'firebase/auth'

/* navigation */
import { createNativeStackNavigator } from '@react-navigation/native-stack'

/* sunnus components */
import { auth } from '@/sunnus/firebase'

/* screens */
import { LoginScreen } from '@/screens/index'
import { UserState } from '@/types/index'
import AuthStack from '@/navigations/AuthStack'
import { UnauthenticatedPages } from '@/types/navigation'
import SplashScreen from '@/screens/SplashScreen'

const Stack = createNativeStackNavigator<UnauthenticatedPages>()
const debugSplash = false

/*
 * uses a react state to keep track of whether the user is logged in or not.
 * this prevent the accidental navigation to a screen that a particular user
 * team is not supposed to see.
 */

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

const minOpts = {
  headerBackVisible: false,
  headerShown: false,
}

const SunNUS = () => {
  /* initialize user's state */
  const [userState, setUserState] = useState<UserState>({
    isLoggedIn: false,
    isRegistered: false,
  })
  const [checkedAuth, setCheckedAuth] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      /*
       * on a failed firebase login, user will be null
       * so it suffices to check the truthiness of user to determine a
       * successful login.
       */
      sleep(800).then(() => {
        // remove this if ever we need a speed boost
        if (user) {
          setUserState({ isLoggedIn: true, isRegistered: true })
        } else {
          setUserState({ isLoggedIn: false, isRegistered: false })
        }
        setCheckedAuth(true)
      })
    })
  }, [])

  const handleLoginState = (userState: UserState) => {
    if (userState.isLoggedIn) {
      if (userState.isRegistered) {
        /* user has logged in with firebase */
        return (
          <Stack.Screen
            name="Authenticated"
            component={AuthStack}
            options={{headerShown: false, animation: 'fade_from_bottom'}}
          />
        )
      } else {
        /* user has logged in as guest (no firebase) */
        return (
          <Stack.Screen
            name="Authenticated"
            component={AuthStack}
            options={minOpts}
          />
        )
        // TODO: handle guest option properly
        // (currently treat guests as registered users)
      }
    } else {
      /* user has yet to log in at all */
      return checkedAuth ? (
        <Stack.Screen
          name="Unauthenticated"
          component={LoginScreen}
          options={minOpts}
        />
      ) : (
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={minOpts}
        />
      )
    }
  }

  return debugSplash ? (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={minOpts} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="Splash">
      {handleLoginState(userState)}
    </Stack.Navigator>
  )
}

export default SunNUS
