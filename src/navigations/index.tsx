import { useState } from 'react'

/* firebase */
import { onAuthStateChanged } from 'firebase/auth'

/* navigation */
import { createNativeStackNavigator } from '@react-navigation/native-stack'

/* sunnus components */
import { auth } from '@/sunnus/firebase'

/* screens */
import { LoginScreen } from '@/screens/index'
import AuthStack from '@/navigations/AuthStack'
import { UnauthenticatedPages } from '@/types/navigation'

const S = createNativeStackNavigator<UnauthenticatedPages>()

/*
 * uses a react state to keep track of whether the user is logged in or not.
 * this prevent the accidental navigation to a screen that a particular user
 * team is not supposed to see.
 */

const SunNUS = () => {
  /* initialize user's state */
  const [loggedIn, setLoggedIn] = useState(true)
  onAuthStateChanged(auth, (user) => {
    setLoggedIn(Boolean(user))
  })
  return (
    <S.Navigator initialRouteName="Authenticated">
      {loggedIn ? (
        <S.Screen
          name="Authenticated"
          component={AuthStack}
          options={{ headerShown: false, animation: 'fade_from_bottom' }}
        />
      ) : (
        <S.Screen
          name="Unauthenticated"
          component={LoginScreen}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }}
        />
      )}
    </S.Navigator>
  )
}

export default SunNUS
