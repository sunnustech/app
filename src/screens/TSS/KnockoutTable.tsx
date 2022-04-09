import { KeyboardAvoidingView, Text, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import Picker from 'react-native-picker-select'
import { Ionicons } from '@expo/vector-icons'

/* navigation */
// import { TSSPage } from '@/types/navigation'
// import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { knockout as styles } from '@/styles/fresh'
import { MutableRefObject, useRef, useState } from 'react'
import { Rounds, Sport } from '@/types/TSS'
import { sportList } from '@/data/constants'
import { reversedRoundList } from '@/data/constants'
import PagerRound from '@/components/TSS/Round'
import { TouchableOpacity } from 'react-native'
import { UseState } from '@/types/SOAR'
import { showNone } from '@/lib/utils'

const SportPicker = ({
  pickerRef,
  tempSport,
}: {
  pickerRef: MutableRefObject<Picker | null>
  tempSport: Sport
}) => {
  function openPicker() {
    pickerRef.current?.togglePicker()
  }

  return (
    <TouchableOpacity onPress={openPicker} style={styles.pickerContainer}>
      <View style={styles.pickerChevronContainer} />
      <View style={styles.pickerTextContainer}>
        <Text style={styles.pickerText}>{tempSport}</Text>
      </View>
      <View style={styles.pickerChevronContainer}>
        <Ionicons name="chevron-down" size={20} style={styles.pickerChevron} />
      </View>
    </TouchableOpacity>
  )
}

const KnockoutTable = ({
  sportState,
  data,
}: {
  sportState: UseState<Sport>
  data: Rounds
}) => {
  // const navigation = useNavigation<TSSPage<'TSSKnockoutTable'>>()
  const [sport, setSport] = sportState
  const [tempSport, setTempSport] = useState<Sport>(sport)

  const pickerRef = useRef<Picker>(null)

  /* currently when you change the sport using the picker,
   * the picker seems to jump back to showing
   * "Select an item...". This is because it calls setSport,
   * which triggers a re-render of this entire component
   *
   * may not need to fix if method of choosing sport changes later
   */

  const AllRounds = () => (
    <>
      {reversedRoundList.map((round, idx) => {
        return <PagerRound matches={data[round]} key={idx} />
      })}
    </>
  )

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <RNPickerSelect
        ref={pickerRef}
        placeholder={{}}
        value={tempSport}
        onValueChange={(value) => setTempSport(value)}
        onDonePress={() => setSport(tempSport)}
        items={sportList.map((sport, i) => ({
          label: sport,
          value: sport,
          key: i,
        }))}
        style={showNone}
      />
      <SportPicker pickerRef={pickerRef} tempSport={tempSport} />
      <AllRounds />
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
