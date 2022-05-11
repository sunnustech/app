import { db } from '@/sunnus/firebase'
import { Sport } from '@/types/TSS'
import {
  collection,
  doc,
  getDoc,
  setDoc,
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { Init } from '@/types/classes'
import { Base } from '@/classes/base'
import { log } from '../utils/cli'

type SportFlexible = Sport | 'none' | 'more than 1'

const toFirestore = (team: Team) => ({
  members: team.members,
  teamName: team.teamName,
  direction: team.direction,
  sport: team.sport,
})

const fromFirestore = (snapshot: QueryDocumentSnapshot<DocumentData>) => {
  const data = snapshot.data()
  const team = new Team({
    teamName: data.teamName,
    direction: data.direction,
    captainsBall: '',
    dodgeball: '',
    frisbee: '',
    tchoukball: '',
    touchRugby: '',
    volleyball: '',
  })
  team.setSport(data.sport)
  return team
}

export class Team extends Base.Team {
  static collectionRef = collection(db, 'teams')
  static empty = new Team({
    teamName: '',
    direction: 'A',
    captainsBall: '',
    dodgeball: '',
    frisbee: '',
    tchoukball: '',
    touchRugby: '',
    volleyball: '',
  })
  /** converts a Team to a database-friendly object */
  static converter: FirestoreDataConverter<Team> = {
    toFirestore: (team: Team) => toFirestore(team),
    fromFirestore: (snapshot) => fromFirestore(snapshot),
  }
  /**
   * gets a user object from the database
   * @param {string} teamName
   * @returns {Promise<Team>}
   */
  static async get(teamName: string): Promise<Team> {
    const docRef = doc(this.collectionRef, teamName).withConverter(
      this.converter
    )
    const snapshot = await getDoc(docRef)
    const data = snapshot.data()
    if (data) {
      return data
    }
    return Team.empty
  }
  /**
   * add/updates the database with the team
   * @param {Team} team
   */
  static async set(team: Team) {
    const docRef = doc(this.collectionRef, team.teamName).withConverter(
      this.converter
    )
    await setDoc(docRef, team, { merge: true })
  }
  constructor(props: Init.Team) {
    super(props)
  }
  setSport(value: SportFlexible) {
    this.sport = value
  }
  nextStation(): string {
    const rem = this._stationsRemaining
    if (!rem || rem.length === 0) {
      return ''
    }
    return rem[0]
  }
  sum(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0)
  }
  displayTimeOffset(): number {
    return Math.abs(this.sum(this._timerEvents))
    // on frontend, the total elapsed time would then be
    // Math.abs(now.getTime() - <returned value>)
  }
  getPausedAt(): number {
    const copyTimerEvents: number[] = [...this._timerEvents]
    const last = copyTimerEvents.pop()
    if (last === undefined) {
      return 0
    }
    const result = Math.abs(-last - this.sum(copyTimerEvents))
    return result
  }
}
