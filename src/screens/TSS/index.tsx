import { KeyboardAvoidingView, Text } from 'react-native'
import RNPickerSelect, { Item } from 'react-native-picker-select'
import { httpsCallable } from 'firebase/functions'

/* navigation */
import { TSSPage } from '@/types/navigation'
import { useNavigation } from '@react-navigation/native'

/* sunnus components */
import { TSS as styles } from '@/styles/fresh'

// DELETE AFTER USE
import { Button } from '@/components/Buttons'
import { Round, Sport, Winner } from '@/types/TSS'
import { Dispatch, Fragment, MutableRefObject, useRef, useState } from 'react'
import { functions } from '@/sunnus/firebase'
import { matchNumbers, sportList, roundList } from '@/data/constants'
import Picker from 'react-native-picker-select'
import { UseState } from '@/types/SOAR'

function getItems(arr: Array<string | number | Sport | Round>): Array<Item> {
  return arr.map((e, i) => ({
    label: e.toString(),
    value: e.toString(),
    key: i,
  }))
}

const CustomPicker = ({
  _ref,
  display,
  setState,
  items,
}: {
  _ref: any
  display: UseState<any>
  setState: Dispatch<any>
  items: Array<Item>
}) => {
  return (
    <RNPickerSelect
      ref={_ref}
      value={display[0]}
      placeholder={{}}
      onValueChange={(value) => display[1](value)}
      onDonePress={() => setState(display[0])}
      items={items}
    />
  )
}

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
        <Fragment key={idx}>
          <Text>Choose {field}</Text>
          <CustomPicker
            _ref={refs[field]}
            setState={states[field][1]}
            display={display[field]}
            items={items[field]}
          />
        </Fragment>
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
