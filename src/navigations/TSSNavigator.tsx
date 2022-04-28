import TSSScreen from '@/screens/TSS'
import TSSKnockoutTable from '@/screens/TSS/KnockoutTable'
import TSSSchedule from '@/screens/TSS/ScheduleScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback, useContext, useEffect, useState } from 'react'
import {
  onSnapshot,
  doc,
  collection,
  query,
  where,
  DocumentData,
} from 'firebase/firestore'
import { Rounds } from '@/types/TSS'
import { db } from '@/sunnus/firebase'
import { LastContext } from '@/contexts/LastContext'
import { AuthPage, TSSPages } from '@/types/navigation'
import { Event } from '@/types/schedule'

const TSSTabs = createBottomTabNavigator<TSSPages>()

const getRounds = (data: DocumentData): Rounds => {
  return {
    champions: data.champions,
    finals: data.finals,
    semifinals: data.semifinals,
    quarterfinals: data.quarterfinals,
    round_of_16: data.round_of_16,
    round_of_32: data.round_of_32,
  }
}

const getEvent = (data: DocumentData): Event => {
  return {
    // TODO: handle errors when taking this in
    start: data.start,
    end: data.end,
    sport: data.sport,
    venue: data.venue,
    court: data.court,
    round: data.round,
    A: data.A,
    B: data.B,
    group: data.group,
    scoreA: data.scoreA,
    scoreB: data.scoreB,
    idA: data.idA,
    idB: data.idB,
    completed: data.completed,
  }
}

const TSSNavigator = () => {
  const navigation = useNavigation<AuthPage<'TSSNavigator'>>()
  // TSS page active state
  // (de-activates when navigating out)
  const [TSSNavActive, setTSSNavActive] = useState<boolean>(false)

  /*
   * listener for knockout table display
   */
  const { setRoundData, sport, setSchedule } = useContext(LastContext)

  useEffect(() => {
    if (TSSNavActive) {
      const unsubscribeKnockoutTable = onSnapshot(
        doc(db, 'TSS', sport),
        (doc) => {
          const liveData = doc.data()
          if (liveData) {
            console.log(`received firebase updates for ${sport} at`, new Date())
            const updatedData = getRounds(liveData)
            setRoundData(updatedData)
          }
        }
      )
      // TODO: un-hardcode this section with user's registered sport
      const myScheduleQuery = query(
        collection(db, 'schedule'),
        where('sport', '==', 'volleyball')
      )
      const unsubscribeSchedule = onSnapshot(myScheduleQuery, (snapshot) => {
        console.log(`received firebase updates for schedule at`, new Date())
        const schedule: Event[] = []
        snapshot.forEach((doc) => {
          const event = getEvent(doc.data())
          schedule.push(event)
        })
        setSchedule(schedule)
      })
      return () => {
        /* detach firebase listener on unmount */
        console.log('detach firebase listeners on TSS navigator')
        unsubscribeKnockoutTable()
        unsubscribeSchedule()
      }
    }
  }, [TSSNavActive, sport])

  useFocusEffect(
    useCallback(() => {
      console.log('focused on TSS navigator')
      setTSSNavActive(true)
      return () => {
        console.log('unfocused TSS navigator')
        setTSSNavActive(false)
      }
    }, [])
  )

  const TSSScreenWrapper = () => <TSSScreen navigation={navigation} />
  const TSSKnockoutTableWrapper = () => (
    <TSSKnockoutTable navigation={navigation} />
  )

  // change the initial route name for deployment
  // use whichever is most convenient when debugging
  return (
    <TSSTabs.Navigator initialRouteName="TSSScheduleScreen">
      <TSSTabs.Screen
        name="TSSScreen"
        component={TSSScreenWrapper}
        options={{ headerShown: false }}
      />
      <TSSTabs.Screen
        name="TSSKnockoutTable"
        component={TSSKnockoutTableWrapper}
        options={{ headerShown: false }}
      />
      <TSSTabs.Screen
        name="TSSScheduleScreen"
        component={TSSSchedule}
        options={{ headerShown: false }}
      />
    </TSSTabs.Navigator>
  )
}

export default TSSNavigator
