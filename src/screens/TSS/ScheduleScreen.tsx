import { Text, View, SafeAreaView, ScrollView } from 'react-native'

/* sunnus components */
import { schedule as styles } from '@/styles/fresh'
import Event from '@/components/schedule/Event'

// DELETE AFTER USE
import { AuthPage } from '@/types/navigation'
import BackButton from '@/components/BackButton'
import { useContext } from 'react'
import { LastContext } from '@/contexts/LastContext'

const ScheduleScreen = ({
  navigation,
}: {
  navigation: AuthPage<'TSSNavigator'>
}) => {
  const { schedule } = useContext(LastContext)
  return (
    <SafeAreaView style={styles.outerContainer}>
      <BackButton navigation={navigation} text="Schedule" />
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollContainer}
      >
        {schedule.map((event, index) => (
          <Event {...event} key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ScheduleScreen