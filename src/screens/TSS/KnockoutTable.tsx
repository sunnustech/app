import { KeyboardAvoidingView, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

/* navigation */
import { TSSPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { TSS as styles } from '@/styles/fresh'
import { useState } from 'react'
import { Sport } from '@/types/TSS'
import { sportList } from '@/data/constants'

const KnockoutTable = ({ sportState }: any) => {
  const navigation = useNavigation<TSSPage<'TSSKnockoutTable'>>()
  const [sport, setSport] = sportState
  const [tempSport, setTempSport] = useState<Sport>(sport)

  /* currently when you change the sport using the picker,
   * the picker seems to jump back to showing
   * "Select an item...". This is because it calls setSport,
   * which triggers a re-render of this entire component
   *
   * may not need to fix if method of choosing sport changes later
   */
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <RNPickerSelect
        onValueChange={(value) => setTempSport(value)}
        onDonePress={() => setSport(tempSport)}
        items={sportList.map((sport, i) => ({
          label: sport,
          value: sport,
          key: i,
        }))}
      />
      <Text>Welcome to the TSS Knockout Table!</Text>
      <Text>Sport: {sport}</Text>
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
