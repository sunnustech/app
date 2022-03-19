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
import { knockout as styles } from '@/styles/fresh'

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

  const Inner = () => {
    return (
      <>
        <View style={styles.container}>
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
      </>
    )
  }

  const NotTheTable = () => {
    return (
      <View style={styles.innerContainer}>
        <Text>The one place for knockout table development and debugging</Text>
        <ButtonGreen onPress={resetTSS}>Reset TSS Data</ButtonGreen>
      </View>
    )
  }

  const TheTable = () => {
    return (
      <View style={styles.tableContainer}>
        <Knockout />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <NotTheTable />
      <TheTable />
      {/* <Inner /> */}
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
