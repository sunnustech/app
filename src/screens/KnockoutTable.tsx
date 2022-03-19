import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

/* sunnus components */
import { Button, ButtonGreen } from '@/components/Buttons'
import { resetTSS, handleMatch, getKnockoutTable } from '@/lib/knockout'
import TSS from '@/data/schema/TSS'
import { Sport } from '@/data/schema/TSS.d'
import { MatchRequest, Round } from '@/types/TSS.d'
import { useState } from 'react'
import { Knockout } from '@/components/Knockout'

const KnockoutTable = () => {
  const [sport, setSport] = useState<Sport>('volleyball')
  const [round, setRound] = useState<Round>('finals')
  const [matchNumber, setMatchNumber] = useState<number>(0)
  const [winner, setWinner] = useState<'A' | 'B'>('B')

  // to be interactively keyed in eventually
  const matchData: MatchRequest = {
    sport,
    round,
    matchNumber,
    winner,
  }

  // get test match
  const m = TSS[sport][round][matchNumber]

  function debugKnockoutTree({ sport }: { sport: Sport }) {
    getKnockoutTable({ sport }).then((data: any) => {
      console.log(sport, data)
    })
  }

  type ButtonProps = {
    onPress: () => void
    children: string
  }

  const Button = ({ onPress, children }: ButtonProps) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <Text>The one place for knockout table development and debugging</Text>
        <ButtonGreen onPress={resetTSS}>Reset TSS Data</ButtonGreen>
        <Text>
          {`${winner === 'A' ? m.A : m.B} wins ${
            winner === 'A' ? m.B : m.A
          } in the ${round} in ${sport}`}
        </Text>
        <View style={styles.innerContainer}>
          <Button onPress={() => handleMatch(matchData)}>Handle Match</Button>
          <Button onPress={() => debugKnockoutTree({ sport })}>
            Debug Table
          </Button>
        </View>
      </View>
      <Knockout />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    width: '60%',
  },
  button: {
    height: 28,
  },
  text: {
    color: 'black',
  },
})

export default KnockoutTable
