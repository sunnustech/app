import { db } from '@/sunnus/firebase'
import { notEmpty } from '@/utils/index'
import { Sport } from '@/types/TSS'
import { sportList, stationOrder } from '@/data/constants'
import {
  collection,
  doc,
  getDoc,
  setDoc,
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp
} from 'firebase/firestore'
import { Init } from '@/types/classes'

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

export class Team {
  members: string[]
  timestamp: number
  teamName: string
  direction: 'A' | 'B'
  sport: SportFlexible
  _started: boolean
  _stopped: boolean
  _startTime: number
  _stopTime: number
  _timerRunning: boolean
  _allEvents: Timestamp[]
  _points: number
  _timerEvents: number[]
  _start: number
  _pausedAt: number
  _stationsCompleted: string[]
  _stationsRemaining: string[]
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
  private static getSport(props: Init.Team) {
    let result: SportFlexible = 'none'
    const sportsSignedUp = sportList
      .map((sport) => {
        const signedUp = notEmpty(props[sport])
        if (signedUp) {
          result = sport
        }
        return signedUp
      })
      .filter((s) => s === true).length

    if (sportsSignedUp > 1) {
      return 'more than 1'
    }
    return result
  }
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
    this.timestamp = 0
    this.teamName = props.teamName
    this.members = []
    this.sport = Team.getSport(props)
    this.direction = props.direction
    this._started = false
    this._stopped = false
    this._startTime = 0
    this._stopTime = 0
    this._timerRunning = false
    this._allEvents = []
    this._points = 0
    this._timerEvents = []
    this._start = 0
    this._pausedAt = 0
    this._stationsCompleted = []
    this._stationsRemaining = stationOrder[props.direction]
  }
  setSport(value: SportFlexible) {
    this.sport = value
  }
}
