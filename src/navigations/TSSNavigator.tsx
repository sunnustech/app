import TSSScreen from '@/screens/TSS'
import TSSKnockoutTable from '@/screens/TSS/KnockoutTable'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { Rounds, Sport } from '@/types/TSS'
import { db } from '@/sunnus/firebase'
import { emptyRounds } from '@/data/schema/TSS'

const TSSTabs = createBottomTabNavigator()

const TSSNavigator = () => {
  const sportState = useState<Sport>('volleyball')
  const [sport, setSport] = sportState
  const [data, setData] = useState<Rounds>(emptyRounds)
  const [TSSNavActive, setTSSNavActive] = useState<boolean>(false)

  const KnockoutTableWrapper = () => {
    return <TSSKnockoutTable sportState={sportState} data={data} />
  }

  useEffect(() => {
    if (TSSNavActive) {
      const unsubscribeFirebase = onSnapshot(doc(db, 'TSS', sport), (doc) => {
        const liveData = doc.data()
        if (liveData) {
          console.log(`received firebase updates for ${sport} at`, new Date())
          const updatedData: Rounds = {
            champions: liveData.champions,
            finals: liveData.finals,
            semifinals: liveData.semifinals,
            quarterfinals: liveData.quarterfinals,
            round_of_16: liveData.round_of_16,
            round_of_32: liveData.round_of_32,
          }
          setData(updatedData)
        }
      })
      return () => {
        /* detach firebase listener on unmount */
        console.log('detach firebase listener on TSS navigator')
        unsubscribeFirebase()
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

  return (
    <TSSTabs.Navigator>
      <TSSTabs.Screen name="TSSScreen" component={TSSScreen} />
      <TSSTabs.Screen
        name="KnockoutTable"
        component={KnockoutTableWrapper}
        options={{ headerShown: false }}
      />
    </TSSTabs.Navigator>
  )
}

export default TSSNavigator
