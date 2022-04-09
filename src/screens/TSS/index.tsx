import {
  KeyboardAvoidingView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { httpsCallable } from 'firebase/functions'

/* navigation */
import { TSSPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { TSS as styles } from '@/styles/fresh'

// DELETE AFTER USE
import { Button } from '@/components/Buttons'
import PickerProvider from '@/components/TSS/PickerProvider'
import { FieldStates, Round, Sport, Winner } from '@/types/TSS'
import { MutableRefObject, useRef, useState } from 'react'
import { functions } from '@/sunnus/firebase'
import { matchNumbers, sportList, roundList } from '@/data/constants'
import Picker from 'react-native-picker-select'
import { getItems } from '@/lib/utils'

type Field = 'sport' | 'round' | 'matchNumber' | 'winner'

const TSSScreen = () => {
  const fields: Array<Field> = ['sport', 'round', 'matchNumber', 'winner']

  const navigation = useNavigation<TSSPage<'TSSScreen'>>()

  const states: FieldStates = {
    sport: useState<Sport>('dodgeball'),
    matchNumber: useState(0),
    winner: useState<Winner>('A'),
    round: useState<Round>('round_of_32'),
  }

  const display: FieldStates = {
    sport: useState<Sport>('dodgeball'),
    matchNumber: useState(0),
    winner: useState<Winner>('A'),
    round: useState<Round>('round_of_32'),
  }

  const refs: Record<Field, MutableRefObject<Picker | null>> = {
    sport: useRef<Picker>(null),
    round: useRef<Picker>(null),
    matchNumber: useRef<Picker>(null),
    winner: useRef<Picker>(null),
  }

  const tempFunction = async () => {
    console.log('sport:', sport)
    console.log('round:', round)
    console.log('matchNumber:', matchNumber)
    console.log('winner:', winner)
  }

  const sport = states.sport[0]
  const round = states.round[0]
  const matchNumber = states.matchNumber[0]
  const winner = states.winner[0]

  const items = {
    sport: getItems(sportList),
    round: getItems(roundList),
    matchNumber: getItems(matchNumbers[round]),
    winner: getItems(['A', 'B']),
  }

  const [a, setA] = useState<Sport>('volleyball')
  const [d, setD] = useState<Sport>('volleyball')
  const r = useRef<Picker>(null)

  const InitializePickers = () => (
    <>
      {fields.map((field, idx) => (
        <PickerProvider
          _ref={refs[field]}
          setState={states[field][1]}
          display={display[field]}
          items={items[field]}
          key={idx}
        />
      ))}
    </>
  )

  const CustomPicker = ({
    pickerRef,
    display,
  }: {
    pickerRef: MutableRefObject<Picker | null>
    display: any
  }) => {
    function openPicker() {
      pickerRef.current?.togglePicker()
    }
    return (
      <TouchableOpacity onPress={openPicker} style={styles.pickerContainer}>
        <View style={styles.pickerTextContainer}>
          <Text style={styles.pickerText}>{display}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Welcome to the TSS page!</Text>
      {fields.map((field, idx) => (
        <PickerProvider
          _ref={refs[field]}
          setState={states[field][1]}
          display={display[field]}
          items={items[field]}
          key={idx}
        />
      ))}
      {fields.map((field, idx) => (
        <CustomPicker
          pickerRef={refs[field]}
          display={display[field]}
          key={idx}
        />
      ))}
      <Text>(you can navigate back by swiping in from the left)</Text>
      <Button onPress={tempFunction}>Test</Button>
    </KeyboardAvoidingView>
  )
}

export default TSSScreen
