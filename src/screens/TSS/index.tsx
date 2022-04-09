import { KeyboardAvoidingView, Text } from 'react-native'
import { httpsCallable } from 'firebase/functions'

/* navigation */
import { TSSPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { TSS as styles } from '@/styles/fresh'

// DELETE AFTER USE
import { Button } from '@/components/Buttons'
import CustomPicker from '@/components/TSS/CustomPicker'
import { Round, Sport, Winner } from '@/types/TSS'
import { Fragment, MutableRefObject, useRef, useState } from 'react'
import { functions } from '@/sunnus/firebase'
import { matchNumbers, sportList, roundList } from '@/data/constants'
import Picker from 'react-native-picker-select'
import { UseState } from '@/types/SOAR'
import { getItems } from '@/lib/utils'

type Field = 'sport' | 'round' | 'matchNumber' | 'winner'

const TSSScreen = () => {
  const fields: Array<Field> = ['sport', 'round', 'matchNumber', 'winner']

  const navigation = useNavigation<TSSPage<'TSSScreen'>>()

  type UseStates = {
    sport: UseState<Sport>
    round: UseState<Round>
    matchNumber: UseState<number>
    winner: UseState<Winner>
  }

  const states: UseStates = {
    sport: useState<Sport>('dodgeball'),
    matchNumber: useState(0),
    winner: useState<Winner>('A'),
    round: useState<Round>('round_of_32'),
  }

  const display: UseStates = {
    sport: useState<Sport>(states.sport[0]),
    round: useState<Round>(states.round[0]),
    matchNumber: useState(states.matchNumber[0]),
    winner: useState<Winner>(states.winner[0]),
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

  const InitializePickers = () => (
    <>
      {fields.map((field, idx) => (
        <CustomPicker
          _ref={refs[field]}
          setState={states[field][1]}
          display={display[field]}
          items={items[field]}
          key={idx}
        />
      ))}
    </>
  )

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Welcome to the TSS page!</Text>
      <InitializePickers />
      <Text>(you can navigate back by swiping in from the left)</Text>
      <Button onPress={tempFunction}>Test</Button>
    </KeyboardAvoidingView>
  )
}

export default TSSScreen
