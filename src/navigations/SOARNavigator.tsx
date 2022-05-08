import { db } from '@/sunnus/firebase'
import { Unsubscribe } from 'firebase/auth'
import { createStackNavigator } from '@react-navigation/stack'
import { SOARPages } from '@/types/navigation'
import { SOARScreen, QRScreen } from '@/screens/index'
import { onSnapshot, doc } from 'firebase/firestore'
import { useContext, useEffect } from 'react'
import { SOARContext } from '@/contexts/SOARContext'
import { converter } from '@/classes/firebase'

const SOARStack = createStackNavigator<SOARPages>()

const SOARNavigator = () => {
  const { teamState } = useContext(SOARContext)

  // context stuff
  const setTeam = teamState[1]

  useEffect(() => {
    const unsubscribeFirebase: Unsubscribe = onSnapshot(
      doc(db, 'teams', 'developer_team').withConverter(converter.team),
      (doc) => {
        const team = doc.data()
        if (team !== undefined) {
          console.debug('received firebase updates at', new Date())
          setTeam(team)
        }
      }
    )
    return () => {
      /* detach firebase listener on unmount */
      console.debug('detach firebase listener on SOAR screen')
      unsubscribeFirebase()
    }
  }, [])

  return (
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
}

export default SOARNavigator
