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
import { Sport } from '@/types/TSS'
import { sportList } from '@/data/constants'
import { reversedRoundList } from '@/data/constants'
import PagerRound from '@/components/TSS/Round'
import { TouchableOpacity } from 'react-native'

const All = () => (
  <>
    {reversedRoundList.map((round, idx) => {
      return (
        <>
          <PagerRound round={round} key={idx} />
        </>
      )
    })}
  </>
)

const SportPicker = ({
  pickerRef,
  sport,
}: {
  pickerRef: MutableRefObject<Picker | null>
  sport: Sport
}) => {
  function openPicker() {
    pickerRef.current?.togglePicker()
  }

  return (
    <TouchableOpacity onPress={openPicker} style={styles.pickerContainer}>
      <View style={styles.verticalCenter}>
        <Text style={styles.pickerText}>{sport}</Text>
      </View>
      <View style={styles.verticalCenter}>
        <Ionicons
          name="chevron-down"
          size={20}
          style={styles.pickerChevron}
        />
      </View>
    </TouchableOpacity>
  )
}

const KnockoutTable = ({ sportState }: any) => {
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

  const showNone = {
    placeholder: styles.displayNone,
    inputAndroid: styles.displayNone,
    inputAndroidContainer: styles.displayNone,
    inputIOS: styles.displayNone,
    inputIOSContainer: styles.displayNone,
    inputWeb: styles.displayNone,
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <RNPickerSelect
        ref={pickerRef}
        onValueChange={(value) => setTempSport(value)}
        onDonePress={() => setSport(tempSport)}
        items={sportList.map((sport, i) => ({
          label: sport,
          value: sport,
          key: i,
        }))}
        style={showNone}
      />
      <SportPicker pickerRef={pickerRef} sport={sport} />
      <All />
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
