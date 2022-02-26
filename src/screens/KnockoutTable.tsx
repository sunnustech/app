import {
  ButtonProps,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

/* sunnus components */
import { Button, ButtonGreen } from '@/components/Buttons'
import styles from '@/styles/main'
import { resetTSS, handleMatch, getKnockoutTable } from '@/lib/knockout'
import TSS from '@/data/schema/TSS'
import { Sport } from '@/data/schema/TSS.d'
import { MatchRequest, Round } from '@/types/TSS.d'
import { useState } from 'react'
import { Knockout } from '@/components/Knockout'
import tw from 'twrnc'

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
    const buttonStyle = tw`rounded-xl bg-blue-400 p-4 w-1/2 flex flex-row justify-center`
    const textStyle = tw`text-white font-bold text-base`
    return (
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Text style={textStyle}>{children}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={tw`flex flex-col w-full mx-auto px-8`}>
        <Text>The one place for knockout table development and debugging</Text>
        <ButtonGreen onPress={resetTSS}>Reset TSS Data</ButtonGreen>
        <Text>
          {`${winner === 'A' ? m.A : m.B} wins ${
            winner === 'A' ? m.B : m.A
          } in the ${round} in ${sport}`}
        </Text>
        <View style={tw`flex flex-row bg-red-100`}>
          <Button onPress={() => handleMatch(matchData)}>
            Handle Match End
          </Button>
          <Button onPress={() => debugKnockoutTree({ sport })}>
            Debug Table
          </Button>
        </View>
      </View>
      <Knockout />
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
