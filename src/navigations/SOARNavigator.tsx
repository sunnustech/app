import { db } from '@/sunnus/firebase'
import { Unsubscribe } from 'firebase/auth'
import { createStackNavigator } from '@react-navigation/stack'
import { SOARPages } from '@/types/navigation'
import { SOARScreen, QRScreen } from '@/screens/index'
import { onSnapshot, doc } from 'firebase/firestore'
import { useCallback, useContext } from 'react'
import { SOARContext } from '@/contexts/SOARContext'
import { converter } from '@/classes/firebase'
import { useFocusEffect } from '@react-navigation/native'
import { QR } from '@/classes/QR'

const SOARStack = createStackNavigator<SOARPages>()

const SOARNavigator = () => {
  const { QRState, gameStations, teamState } = useContext(SOARContext)

  // context stuff
  const setQr = QRState[1]
  const setTeam = teamState[1]

  useFocusEffect(
    useCallback(() => {
      console.debug('focused on SOAR navigator')
      const unsubscribeFirebase: Unsubscribe = onSnapshot(
        doc(db, 'teams', 'developer_team').withConverter(converter.team),
        (doc) => {
          const team = doc.data()
          if (team !== undefined) {
            console.debug('received firebase updates at', new Date())
            setTeam(team)
            gameStations.update(team)
            console.debug(`\n<${team.teamName}>`)
            console.debug(`${team._points} points,`)
            console.debug(
              `${team._stationsRemaining.length} stations remaining\n`
            )
            console.debug(
              `${team._stationsRemaining}\n`
            )
            console.debug(
              `next up: ${team.nextStation()}\n`
            )
          }
        }
      )
      return () => {
        setQr(QR.empty)
        console.debug('unfocused SOAR navigator')
        /* detach firebase listener on unmount */
        unsubscribeFirebase()
        console.debug('detach firebase listener on SOAR navigator')
      }
    }, [])
  )

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
