import TSS from '@/data/schema/TSS'
import push from '@/data/push'
import { MatchRequest, Round } from './knockout.d'

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
      // update the outcome of that match
      [round]: {
        [matchNumber]: {
          ...match,
          winner,
        },
      },
      // apend the schedule for next match
      [nextRound]: {
        [nextMatchNumber]: {
          ...nextMatch,
          [matchNumber % 2 === 0 ? 'A' : 'B']: match[winner],
        },
      },
    },
  }

  // update the database
  push({ collection: 'TSS', data: packet })

  // push that team into the next round
}

export { resetTSS, handleMatch, delimiter }
