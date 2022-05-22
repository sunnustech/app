import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import Picker from 'react-native-picker-select'
import { Ionicons } from '@expo/vector-icons'
import colors from '@/styles/colors'

/* navigation */
// import { TSSPage } from '@/types/navigation'
// import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { knockout as styles } from '@/styles/fresh'
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Sport } from '@/types/TSS'
import { sportList, reversedRoundList } from '@/data/constants'
import PagerRound from '@/components/knockout/Round'
import { showNone } from '@/lib/picker'
import { LastContext } from '@/contexts/LastContext'
import { AuthPage } from '@/types/navigation'
import BackButton from '@/components/BackButton'
import { globalStyles } from '@/styles/global'

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
  navigation,
}: {
  navigation: AuthPage<'TSSNavigator'>
}) => {
  // const navigation = useNavigation<TSSPage<'TSSKnockoutTable'>>()
  const { sport, setSport, roundData } = useContext(LastContext)
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
    <View style={{ width: '100%' }}>
      {reversedRoundList.map((round, idx) => {
        return <PagerRound matches={roundData[round]} key={idx} />
      })}
    </View>
  )

  /* to sync up value of sport/tempSport with match handler page */
  useEffect(() => {
    setTempSport(sport)
  }, [sport])

  return (
    <SafeAreaView style={globalStyles.container.base}>
      <BackButton navigation={navigation} text="TSS Knockout Table" />
      <View style={globalStyles.container.body}>
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
      </View>
    </SafeAreaView>
  )
}

export default KnockoutTable
