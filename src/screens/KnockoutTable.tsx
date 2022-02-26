import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'

/* sunnus components */
import { Button, ButtonGreen } from '@/components/Buttons'
import styles from '@/styles/main'
import { resetTSS, handleMatch } from '@/lib/knockout'
import TSS from '@/data/schema/TSS'
import { Sport } from '@/data/schema/TSS.d'
import { MatchRequest, Round } from '@/types/TSS.d'
import { useState } from 'react'

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

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text>The one place for knockout table development and debugging</Text>
      <View style={styles.buttonContainer}>
        <ButtonGreen onPress={resetTSS}>Reset TSS Data</ButtonGreen>
        <Text>
          {`${winner === 'A' ? m.A : m.B} wins ${
            winner === 'A' ? m.B : m.A
          } in the ${round} in ${sport}`}
        </Text>
        <Button onPress={() => handleMatch(matchData)}>Handle Match End</Button>
      </View>
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
