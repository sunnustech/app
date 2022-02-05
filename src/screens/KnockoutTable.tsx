import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

/* sunnus components */
import { Button, ButtonGreen, ButtonRed } from '@/components/Buttons'
import styles from '@/styles/main'
import { resetTSS, handleMatch, delimiter } from '@/lib/knockout'
import TSS from '@/data/schema/TSS'
import { Sport } from '@/data/schema/TSS.d'
import { MatchRequest, Round } from '@/lib/knockout.d'
import { useState } from 'react'

const KnockoutTable = () => {
  const [sport, setSport] = useState<Sport>('volleyball')
  const [round, setRound] = useState<Round>('round_of_32')
  const [matchNumber, setMatchNumber] = useState<number>(0)
  const [winner, setWinner] = useState<'A' | 'B'>('A')

  // to be interactively keyed in eventually
  const matchData: MatchRequest = {
    sport,
    round,
    matchNumber,
    winner,
  }

  const m = TSS[sport][round][matchNumber]
  const sportList = ['dodgeball', 'frisbee', 'volleyball', 'tchoukball']
  const roundList = [
    'round_of_32',
    'round_of_16',
    'quarterfinals',
    'semifinals',
    'finals',
  ]

  const CustomPicker = ({ state, setState, items }) => {
    const [value, setValue] = useState(state)
    function send(value) {
      setState(value)
    }
    return (
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(e) => setValue(e)}
          doneText="Select"
          onDonePress={() => send(value)}
          // items={sportList.map((e) => ({
          //   label: e.charAt(0).toUpperCase() + e.slice(1),
          //   value: e,
          // }))}
          items={items}
        />
      </View>
    )
  }

  // items={[
  //   { label: 'volleyball', value: 'volleyball' },
  //   { label: 'dodgeball', value: 'dodgeball' },
  //   { label: 'tchoukball', value: 'tchoukball' },
  //   { label: 'frisbee', value: 'frisbee' },
  // ]}
  function debug() {
    delimiter()
    console.log(round)
    const idx = roundList.indexOf(round)
    console.log('index', idx)
    const items = roundList.map((e, idx) => {
      const exponent = roundList.length - idx
      const total = 2 ** exponent
      console.log(total)
    })
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text>The one place for knockout table development and debugging</Text>
      <View style={styles.buttonContainer}>
        <ButtonGreen onPress={resetTSS}>Reset TSS Data</ButtonGreen>
        <CustomPicker
          state={sport}
          setState={setSport}
          items={sportList.map((e) => ({
            label: e,
            value: e,
          }))}
        />
        <CustomPicker
          state={round}
          setState={setRound}
          items={roundList.map((e) => ({
            label: e,
            value: e,
          }))}
        />
        <Text>
          {`${winner === 'A' ? m.A : m.B} wins ${
            winner === 'A' ? m.B : m.A
          } in the ${round} in ${sport}`}
        </Text>
        <Button onPress={() => handleMatch(matchData)}>Handle Match End</Button>
        {/* <ButtonRed onPress={debug}>Debug</ButtonRed> */}
      </View>
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
