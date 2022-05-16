import { SafeAreaView, ScrollView } from 'react-native'

/* sunnus components */
import { schedule as styles } from '@/styles/fresh'
import Event from '@/components/schedule/Event'

// DELETE AFTER USE
import { AuthPage } from '@/types/navigation'
import BackButton from '@/components/BackButton'
import { useContext } from 'react'
import { LastContext } from '@/contexts/LastContext'
import { globalStyles } from '@/styles/global'

const ScheduleScreen = ({
  navigation,
}: {
  navigation: AuthPage<'TSSNavigator'>
}) => {
  const debug = false
  const { schedule } = useContext(LastContext)
  return (
    <SafeAreaView style={globalStyles.container.base}>
      <BackButton navigation={navigation} text="Schedule" />
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollContainer}
      >
        {debug
          ? schedule
              .slice(0, 2)
              .map((event, index) => <Event {...event} key={index} />)
          : schedule.map((event, index) => <Event {...event} key={index} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ScheduleScreen
