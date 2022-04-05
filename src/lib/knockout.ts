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
 * Returns the current date, to be used for database recording
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

const cascadeUpdate = async ({
  sport,
  round,
  matchNumber,
  winner,
}: MatchRequest) => {
  // Nothing to check to update if team is in finals
  if (round === 'finals') {
    return
  }
  await getDoc(doc(db, 'TSS', sport))
    .then((doc) => {
      const docData = doc.data()
      if (docData) {
        const matchInstance = docData[round][matchNumber]
        // New entry, winner has not been decided. No need to check if there is a need to update other entries.
        if (matchInstance.winner === 'U') {
          return
        }
        // Recursive call, should
        const nextRound: Round = getNextRound(round) as Round
        const nextMatchNumber = getNextMatchNumber(matchNumber)
        const newInstance: MatchRequest = {
          sport: sport,
          round: nextRound,
          matchNumber: nextMatchNumber,
          winner: winner,
        }
        handleMatch(newInstance)
      }
    })
    .catch((err) => {
      console.warn('error fetching tss match data from Firestore', err)
    })
}

async function handleMatch({
  sport,
  round,
  matchNumber,
  winner,
}: MatchRequest) {
  delimiter()

  // get that exact match
  await getDoc(doc(db, 'TSS', sport))
    .then((doc) => {
      const docData = doc.data()
      if (docData) {
        const matchParticipants: MatchParticipants = docData[round][matchNumber]
        const winnerName =
          matchParticipants[winner.toString() === 'A' ? 'A' : 'B']
        console.log("Match parts ", matchParticipants)
        console.log("winnername ", winnerName)
        var packet
        if (round === 'finals') {
          packet = {
            [sport]: {
              // update the outcome of that match
              [round]: {
                [matchNumber]: { ...matchParticipants, winner },
              },
              champions: winnerName,
            },
          }
          push({ collection: 'TSS', docs: packet })
          return
        }
        const nextRound: Round = getNextRound(round)
        const nextMatchNumber = getNextMatchNumber(matchNumber)
        const nextMatch = TSS[sport][nextRound][nextMatchNumber]
        const nextSlot: Winner = matchNumber % 2 === 0 ? 'A' : 'B'
        // New entry, winner has not been decided. No need to check if there is a need to update other entries.
        if (matchParticipants.winner === 'U') {
          packet = {
            [sport]: {
              // update the outcome of that match
              [round]: {
                [matchNumber]: { ...matchParticipants, winner },
              },
              // apend the schedule for next match
              [nextRound]: {
                [nextMatchNumber]: { ...nextMatch, [nextSlot]: winnerName, winner: 'U' },
              },
            },
          }
          push({ collection: 'TSS', docs: packet })
          return
        }
        // Case where wrong entry, we need to update firebase
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
