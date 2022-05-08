import { db } from '@/sunnus/firebase'
import { TeamProps } from '@/types/participants'
import { Unsubscribe } from 'firebase/auth'
import { createStackNavigator } from '@react-navigation/stack'
import { SOARPages } from '@/types/navigation'
import { SOARScreen, QRScreen } from '@/screens/index'
import { onSnapshot, doc } from 'firebase/firestore'
import { useContext, useEffect } from 'react'
import { SOARContext } from '@/contexts/SOARContext'
import { getLocations } from '@/lib/SOAR'
import { converter } from '@/classes/firebase'
import { Team } from '@/classes/team'

const SOARStack = createStackNavigator<SOARPages>()

const SOARNavigator = () => {
  const { locationState, filteredState, displayLocationState } =
    useContext(SOARContext)

  // context stuff
  const setDisplayLocations = displayLocationState[1]
  const locations = locationState[0]
  const filtered = filteredState[0]

  useEffect(() => {
    const unsubscribeFirebase: Unsubscribe = onSnapshot(
      doc(db, 'teams', 'developer_team').withConverter(converter.team),
      (doc) => {
        const data = doc.data()
        if (data !== undefined) {
          console.debug('received firebase updates at', new Date())
          const team: Team = data
          console.log(team)
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
