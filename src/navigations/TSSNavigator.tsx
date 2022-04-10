import TSSScreen from '@/screens/TSS'
import TSSKnockoutTable from '@/screens/TSS/KnockoutTable'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useContext, useEffect, useState } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { Rounds, Sport } from '@/types/TSS'
import { db } from '@/sunnus/firebase'
import { emptyRounds } from '@/data/schema/TSS'
import { LastContext } from '@/contexts/LastContext'

const TSSTabs = createBottomTabNavigator()

const TSSNavigator = () => {
  // TSS page active state
  // (de-activates when navigating out)
  const [TSSNavActive, setTSSNavActive] = useState<boolean>(false)

  /*
   * listener for knockout table display
   */
  const sportState = useState<Sport>('volleyball')
  const [sport, _] = sportState
  const { roundData, setRoundData } = useContext(LastContext)

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
          setRoundData(updatedData)
        }
      })
      return () => {
        /* detach firebase listener on unmount */
        console.log('detach firebase listener on TSS navigator')
        unsubscribeFirebase()
      }
    }
  }, [TSSNavActive, sport])

  /* wrappers
   * to pass props to the other screens
   */
  const KnockoutTableWrapper = () => {
    return <TSSKnockoutTable sportState={sportState} data={roundData} />
  }

  const TSSMatchUpdaterWrapper = () => {
    return <TSSScreen sportState={sportState} />
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
