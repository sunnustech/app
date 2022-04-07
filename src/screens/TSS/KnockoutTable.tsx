import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

/* navigation */
import { TSSPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { knockout as styles } from '@/styles/fresh'
import { useRef, useState } from 'react'
import { Sport, CurrentPageState } from '@/types/TSS'
import { sportList } from '@/data/constants'
import { reversedRoundList } from '@/data/constants'
import PagerRound from '@/components/TSS/Round'
import { UseState } from '@/types/SOAR'

const All = ({
  refList,
  currentPageState,
}: {
  refList: Array<any>
  currentPageState: UseState<CurrentPageState>
}) => {
  return (
    <>
      {reversedRoundList.map((round, idx) => {
        return (
          <>
            <PagerRound
              round={round}
              key={idx}
              _ref={refList[idx]}
              currentPageState={currentPageState}
            />
          </>
        )
      })}
    </>
  )
}

const KnockoutTable = ({ sportState }: any) => {
  const navigation = useNavigation<TSSPage<'TSSKnockoutTable'>>()
  const [sport, setSport] = sportState
  const [tempSport, setTempSport] = useState<Sport>(sport)
  const currentPageState = useState<CurrentPageState>({
    round_of_32: 0,
    round_of_16: 0,
    quarterfinals: 0,
    semifinals: 0,
    finals: 0,
  })
  const [currentPages, setCurrentPages] = currentPageState
  const ref32 = useRef()
  const ref16 = useRef()
  const refQuarterFinal = useRef()
  const refSemiFinal = useRef()
  const refFinal = useRef()
  const refList = [ref32, ref16, refQuarterFinal, refSemiFinal, refFinal]

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
      <All refList={refList} currentPageState={currentPageState} />
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
