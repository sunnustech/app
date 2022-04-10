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
  // TSS page active state
  // (de-activates when navigating out)
  const [TSSNavActive, setTSSNavActive] = useState<boolean>(false)

  /*
   * listener for knockout table display
   */
  const sportState = useState<Sport>('volleyball')
  const [sport, setSport] = sportState
  const [data, setData] = useState<Rounds>(emptyRounds)
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
  const KnockoutTableWrapper = () => {
    return <TSSKnockoutTable sportState={sportState} data={data} />
  }

  /*
   * listener for match updater
   * (to show actual team names instead of A and B)
   */
  const _sportState = useState<Sport>('volleyball')
  const [_sport, _setSport] = _sportState
  const [_data, _setData] = useState<Rounds>(emptyRounds)
  useEffect(() => {
    if (TSSNavActive) {
      const unsubscribeFirebase = onSnapshot(doc(db, 'TSS', _sport), (doc) => {
        const liveData = doc.data()
        if (liveData) {
          console.log(`[match updater] firebase updated for ${_sport} at`, new Date())
          const updatedData: Rounds = {
            champions: liveData.champions,
            finals: liveData.finals,
            semifinals: liveData.semifinals,
            quarterfinals: liveData.quarterfinals,
            round_of_16: liveData.round_of_16,
            round_of_32: liveData.round_of_32,
          }
          _setData(updatedData)
        }
      })
      return () => {
        /* detach firebase listener on unmount */
        console.log('detach firebase listener on TSS navigator')
        unsubscribeFirebase()
      }
    }
  }, [TSSNavActive, _sport])
  const TSSMatchUpdaterWrapper = () => {
    return <TSSScreen sportState={_sportState} data={_data} />
  }

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
      <TSSTabs.Screen
        name="TSSScreen"
        component={TSSMatchUpdaterWrapper}
        options={{ headerShown: false }}
      />
      <TSSTabs.Screen
        name="KnockoutTable"
        component={KnockoutTableWrapper}
        options={{ headerShown: false }}
      />
    </TSSTabs.Navigator>
  )
}

export default TSSNavigator
