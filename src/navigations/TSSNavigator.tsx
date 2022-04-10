import TSSScreen from '@/screens/TSS'
import TSSKnockoutTable from '@/screens/TSS/KnockoutTable'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useContext, useEffect, useState } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { Rounds } from '@/types/TSS'
import { db } from '@/sunnus/firebase'
import { LastContext } from '@/contexts/LastContext'

const TSSTabs = createBottomTabNavigator()

const TSSNavigator = () => {
  // TSS page active state
  // (de-activates when navigating out)
  const [TSSNavActive, setTSSNavActive] = useState<boolean>(false)

  /*
   * listener for knockout table display
   */
  const { setRoundData, sport } = useContext(LastContext)

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
        component={TSSScreen}
        options={{ headerShown: false }}
      />
      <TSSTabs.Screen
        name="KnockoutTable"
        component={TSSKnockoutTable}
        options={{ headerShown: false }}
      />
    </TSSTabs.Navigator>
  )
}

export default TSSNavigator
