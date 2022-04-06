import { KeyboardAvoidingView, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

/* navigation */
import { TSSPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { TSS as styles } from '@/styles/fresh'
import { useState } from 'react'
import { Sport } from '@/types/TSS'

const KnockoutTable = ({ sportState }: any) => {
  const navigation = useNavigation<TSSPage<'TSSKnockoutTable'>>()
  const [sport, setSport] = sportState
  const [tempSport, setTempSport] = useState<Sport>()

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <RNPickerSelect
        onValueChange={(value) => setTempSport(value)}
        onDonePress={() => setSport(tempSport)}
        items={[
          { label: 'dodgeball', value: 'dodgeball', key: 0 },
          { label: 'frisbee', value: 'frisbee', key: 1 },
          { label: 'tchoukball', value: 'tchoukball', key: 2 },
          { label: 'volleyball', value: 'volleyball', key: 3 },
        ]}
      />
      <Text>Welcome to the TSS Knockout Table!</Text>
      <Text>Sport: {sport}</Text>
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
