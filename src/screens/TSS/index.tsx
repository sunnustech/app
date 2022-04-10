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
import PickerProvider from '@/components/TSS/PickerProvider'
import { Match, Round, Sport, Winner } from '@/types/TSS'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { functions } from '@/sunnus/firebase'
import { matchNumbers, sportList, roundList } from '@/data/constants'
import Picker from 'react-native-picker-select'
import { getItems } from '@/lib/utils'
import CustomPicker from '@/components/TSS/CustomPicker'
import { UseState } from '@/types/SOAR'
import { Rounds } from '@/types/TSS'

type Field = 'sport' | 'round' | 'matchNumber' | 'winner'

const TSSScreen = ({
  sportState,
  data,
}: {
  sportState: UseState<Sport>
  data: Rounds
}) => {
  const navigation = useNavigation<TSSPage<'TSSScreen'>>()
  const fields: Array<Field> = ['sport', 'round', 'matchNumber', 'winner']

  type DisplayStates = {
    sport: UseState<Sport>
    round: UseState<Round>
    matchNumber: UseState<number>
    winner: UseState<string>
  }

  const roundState = useState<Round>('round_of_32')
  const matchNumberState = useState(0)

  const round = roundState[0]
  const matchNumber = matchNumberState[0]

  const states: DisplayStates = {
    sport: sportState,
    matchNumber: matchNumberState,
    round: roundState,
    winner: useState<string>(data[round][matchNumber].A),
  }

  const sport = states.sport[0]
  const winner = states.winner[0]

  const display: DisplayStates = {
    sport: useState<Sport>(sport),
    matchNumber: useState(0),
    winner: useState<string>(winner),
    round: useState<Round>('round_of_32'),
  }

  const refs: Record<Field, MutableRefObject<Picker | null>> = {
    sport: useRef<Picker>(null),
    round: useRef<Picker>(null),
    matchNumber: useRef<Picker>(null),
    winner: useRef<Picker>(null),
  }

  /* when the match number changes, refresh the team names */
  useEffect(() => {
    // console.log('!match number -> winner')
    states.winner[1](data[round][matchNumber].A)
    display.winner[1](data[round][matchNumber].A)
  }, [matchNumber])

  /* when the round changes, reset the match number to zero */
  useEffect(() => {
    // console.log('!round -> match number')
    states.matchNumber[1](0)
    display.matchNumber[1](0)
  }, [round])

  function show(state: DisplayStates) {
    console.log(state.sport[0])
    console.log(state.round[0])
    console.log(state.matchNumber[0])
    console.log(state.winner[0])
  }

  const tempFunction = async () => {
    console.log('\n\n\n\n\n\nreal states')
    show(states)
    console.log('\ndisplay states')
    show(display)
  }

  const items = {
    sport: getItems(sportList),
    round: getItems(roundList),
    matchNumber: getItems(matchNumbers[round]),
    winner: getItems([data[round][matchNumber].A, data[round][matchNumber].B]),
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.titleText}>TSS Match Update Tool</Text>
      {fields.map((field, idx) => {
        return (
          <PickerProvider
            _ref={refs[field]}
            setState={states[field][1]}
            display={display[field]}
            items={items[field]}
            key={idx}
          />
        )
      })}
      {fields.map((field, idx) => {
        return (
          <CustomPicker
            pickerRef={refs[field]}
            display={display[field][0]}
            key={idx}
          />
        )
      })}
      <TouchableOpacity onPress={tempFunction} style={styles.confirmContainer}>
        <View style={styles.confirmTextContainer}>
          <Text style={styles.confirmText}>Confirm</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default TSSScreen
