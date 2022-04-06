import { KeyboardAvoidingView, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { onSnapshot, doc } from 'firebase/firestore'

/* navigation */
import { TSSPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { TSS as styles } from '@/styles/fresh'
import { Sport } from '@/types/TSS'
import { db } from '@/sunnus/firebase'
import { TeamProps } from '@/types/participants'

const KnockoutTable = () => {
  const navigation = useNavigation<TSSPage<'TSSKnockoutTable'>>()

  const [sport, setSport] = useState<Sport>('volleyball')

  useEffect(() => {
    const unsubscribeFirebase = onSnapshot(doc(db, 'TSS', sport), (doc) => {
      const liveData = doc.data()
      if (liveData) {
        console.log('received firebase TSS kt updates at', new Date())
        const updatedTeamData: TeamProps = {
          SOARTimerEvents: liveData.SOARTimerEvents,
          SOARStart: liveData.SOARStart,
          teamName: liveData.teamName,
          SOAR: liveData.SOAR,
          members: liveData.members,
          registeredEvents: liveData.registeredEvents,
          SOARPausedAt: liveData.SOARPausedAt,
          SOARStationsCompleted: liveData.SOARStationsCompleted,
          SOARStationsRemaining: liveData.SOARStationsRemaining,
        }
      }
    })
    return () => {
      /* detach firebase listener on unmount */
      console.log('detach firebase listener on TSS knockout')
      unsubscribeFirebase()
    }
  }, [])

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Welcome to the TSS Knockout Table!</Text>
      <Text>Choose sport</Text>
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
