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

const Stack = createNativeStackNavigator()

/*
 * uses a react state to keep track of whether the user is logged in or not.
 * this prevent the accidental navigation to a screen that a particular user
 * group is not supposed to see.
 */
const SunNUS = () => {
  /* initialize user's state */
  const [userState, setUserState] = useState<UserState>({
    isLoggedIn: false,
    isRegistered: false,
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      /*
       * on a failed firebase login, user will be null
       * so it suffices to check the truthiness of user to determine a
       * successful login.
       */
      if (user) {
        setUserState({ isLoggedIn: true, isRegistered: true })
      } else {
        setUserState({ isLoggedIn: false, isRegistered: false })
      }
    })
  }, [])

  const handleLoginState = (userState: UserState) => {
    const minOpts = {
      headerBackVisible: false,
      headerShown: false,
    }

    if (userState.isLoggedIn) {
      if (userState.isRegistered) {
        /* user has logged in with firebase */
        return (
          <Stack.Screen name="Home" component={AuthStack} options={minOpts} />
        )
      } else {
        /* user has logged in as guest (no firebase) */
        return (
          <Stack.Screen name="Home" component={AuthStack} options={minOpts} />
        )
        // TODO: handle guest option properly
        // (currently treat guests as registered users)
      }
    } else {
      /* user has yet to log in at all */
      return (
        <Stack.Screen name="Login" component={LoginScreen} options={minOpts} />
      )
    }
  }

  return <Stack.Navigator>{handleLoginState(userState)}</Stack.Navigator>
}

export default SunNUS
