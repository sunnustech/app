import { SafeAreaView, ScrollView } from 'react-native'
import Event from '@/components/schedule/Event'
import { AuthPage } from '@/types/navigation'
import BackButton from '@/components/BackButton'
import { useContext, useRef, useState } from 'react'
import { LastContext } from '@/contexts/LastContext'
import { globalStyles } from '@/styles/global'
import { SOARContext } from '@/contexts/SOARContext'
import type { Sport } from '@/types/TSS'
import Picker from 'react-native-picker-select'
import CustomPicker from '@/components/knockout/CustomPicker'
import { getPickerItems } from '@/lib/picker'
import { sportList } from '../../data/constants'
import PickerProvider from '../../components/knockout/PickerProvider'

const ScheduleScreen = ({
  navigation,
}: {
  navigation: AuthPage<'TSSNavigator'>
}) => {
  const debug = false
  const { schedule } = useContext(LastContext)
  const { sport, setSport } = useContext(LastContext)
  // const initialSport: Sport =
  //   team.sport === 'more than 1' || team.sport === 'none'
  //     ? 'volleyball'
  //     : team.sport
  const [display, setDisplay] = useState<Sport>(sport)
  const pickerRef = useRef<Picker>(null)

  return (
    <SafeAreaView style={globalStyles.container.base}>
      <BackButton navigation={navigation} text="Schedule" />
      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        style={{ width: '100%' }}
      >
        <PickerProvider
          _ref={pickerRef}
          setState={setSport}
          display={[display, setDisplay]}
          items={getPickerItems(sportList)}
        />
        <CustomPicker pickerRef={pickerRef} display={display} />
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
