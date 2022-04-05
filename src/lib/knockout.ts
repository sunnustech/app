import TSS from '@/data/schema/TSS'
import push from '@/data/push'
import {
  MatchParticipants,
  MatchRequest,
  Round,
  Winner,
  Sport,
} from '@/types/TSS'
import { pullCollection } from '@/data/pull'
import { db } from '@/sunnus/firebase'
import { getDoc, doc } from 'firebase/firestore'

/**
 * Prints the current date to the terminal
 */
const delimiter = () => {
  const date = new Date().toString()
  const line = '='.repeat(date.length)
  console.log(`\n\n\n${line}\n${date}\n${line}\n`) // perma
}

const sportList = ['dodgeball', 'frisbee', 'volleyball', 'tchoukball']
const roundList: Array<Round> = [
  'round_of_32',
  'round_of_16',
  'quarterfinals',
  'semifinals',
  'finals',
]

function resetTSS() {
  push({ collection: 'TSS', docs: TSS, merge: false })
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

/**
 * Transitions teams to the next round. If team is in final, it has no more rounds and thus ends.
 * @param round Round that the team is currently in
 * @returns Next round that the team will be in
 */
const getNextRound = (round: Round) => {
  const currentOrder = roundList.indexOf(round)
  const nextOrder = currentOrder + 1
  return nextOrder <= roundList.length ? roundList[currentOrder + 1] : 'finals'
}

const getNextMatchNumber = (matchNumber: number) => {
  return Math.floor(matchNumber / 2)
}

/**
 * Adds or updates the database based on the outcome specified
 * @param {MatchRequest} MatchRequestObject An object representing the outcome a match
 */
const handleMatch = async ({
  sport,
  round,
  matchNumber,
  winner,
}: MatchRequest) => {
  // Prints down current date in terminal, to be used for debugging
  delimiter()

  // Gets a snapshot of the doc related to the sport
  await getDoc(doc(db, 'TSS', sport))
    .then((doc) => {
      // Queried only once
      const docData = doc.data()
      if (docData) {
        const matchParticipants: MatchParticipants = docData[round][matchNumber]

        const winnerName =
          matchParticipants[winner.toString() === 'A' ? 'A' : 'B']
        var packet

        // If the round is finals, we only need to update this round
        if (round === 'finals') {
          packet = {
            [sport]: {
              // Update the outcome of the current match
              [round]: {
                [matchNumber]: { ...matchParticipants, winner },
              },
              champions: winnerName,
            },
          }
          push({ collection: 'TSS', docs: packet })
          return
        }

        // For any other round, we need to update the winner of current, and next round
        const nextRound: Round = getNextRound(round)
        const nextMatchNumber = getNextMatchNumber(matchNumber)
        const nextMatch = TSS[sport][nextRound][nextMatchNumber]
        const nextSlot: Winner = matchNumber % 2 === 0 ? 'A' : 'B'

        // Be it add or update, only need to check one layer deeper
        packet = {
          [sport]: {
            // update the outcome of that match
            [round]: {
              [matchNumber]: { ...matchParticipants, winner },
            },
            // apend the schedule for next match
            [nextRound]: {
              [nextMatchNumber]: {
                ...nextMatch,
                [nextSlot]: winnerName,
                winner: 'U',
              },
            },
          },
        }
        push({ collection: 'TSS', docs: packet })
        return
      }
    })
    .catch((err) => {
      console.warn('error fetching tss match data from Firestore', err)
    })
}

async function getKnockoutTable({ sport }: { sport: Sport }) {
  const data = await pullCollection({ collection: 'TSS' })
  return data[sport]
}

export { resetTSS, handleMatch, delimiter, getKnockoutTable }
export { sportList, roundList }
