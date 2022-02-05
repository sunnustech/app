import { KeyboardAvoidingView, Text, View } from 'react-native'

/* sunnus components */
import { Button, ButtonGreen, ButtonRed } from '@/components/Buttons'
import styles from '@/styles/main'
import TSS from '@/data/schema/TSS'
import push from '@/data/push'

// just a simple console delimiter
const delimiter = () => {
  const date = new Date().toString()
  const line = '='.repeat(date.length)
  console.log(`\n\n\n${line}\n${date}\n${line}\n`)
}

function resetTSS() {
  push({ collection: 'TSS', data: TSS, merge: false })
}

/*
 * have tabs to toggle which knockout table to view
 * dodgeball/volleyball/tchoukball/frisbee...
 */

/* BACKEND FUNCTIONS */

/*
 * takes in
 *  1. event type (dodgeball/volleyball/tchoukball/frisbee...)
 *  2. match id
 *  3. match winner
 * writes the outcome to database
 *
 */
type MatchRequest = {
  sport: 'dodgeball' | 'frisbee' | 'volleyball' | 'tchoukball'
  matchNumber: number
  winner: 'A' | 'B'
  round: Round
}

type Round =
  | 'round_of_32'
  | 'round_of_16'
  | 'quarterfinals'
  | 'semifinals'
  | 'finals'

const roundOrder: Array<Round> = [
  'round_of_32',
  'round_of_16',
  'quarterfinals',
  'semifinals',
  'finals',
]

function handleMatch({ sport, round, matchNumber, winner }: MatchRequest) {
  delimiter()

  if (round === 'finals') {
    // handle champions
  }

  const nextRound: Round = roundOrder[roundOrder.indexOf(round) + 1]
  console.log('nextRound', nextRound)
  const nextMatchNumber = Math.floor(matchNumber / 2)
  const nextMatch = TSS[sport][nextRound][nextMatchNumber]

  // get that exact match
  const match = TSS[sport][round][matchNumber]

  // create a packet containing only that match's data + outcome
  const packet = {
    [sport]: {
      [round]: {
        [matchNumber]: {
          ...match,
          winner,
        },
      },
      [nextRound]: {
        [nextMatchNumber]: {
          ...nextMatch,
          [matchNumber % 2 === 0 ? 'A' : 'B']: match[winner],
        },
      },
    },
  }

  // apend the schedule for next match

  // update the database
  push({ collection: 'TSS', data: packet })

  // push that team into the next round
}

function debug() {
  delimiter()

  // get match details
  const round = 'round_of_32'
  const matchNumber = 0
  const match = TSS.volleyball[round][matchNumber]

  // set winner
  const winner = 'A'
  match.winner = match[winner]

  console.log('round:', round)
  console.log('match:', matchNumber)
  console.log(match)
  console.log(TSS.volleyball[round][matchNumber])

  // update the database
  push({ collection: 'TSS', data: TSS })
}

const KnockoutTable = () => {
  // to be interactively keyed in eventually
  const matchData = {
    sport: 'volleyball',
    round: 'round_of_16',
    matchNumber: 5,
    winner: 'B',
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>The one place for knockout table development and debugging</Text>
      <View style={styles.buttonContainer}>
        <ButtonGreen onPress={resetTSS}>Reset TSS Data</ButtonGreen>
        <Text>
          Independent_Decorators wins Gentle_Sweaters in the round of 32 in
          volleyball
        </Text>
        <Button onPress={() => handleMatch(matchData)}>Handle Match End</Button>
        <ButtonRed onPress={debug}>Debug</ButtonRed>
      </View>
    </KeyboardAvoidingView>
  )
}

export default KnockoutTable
