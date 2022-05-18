import { Sport } from '@/types/TSS'
import { notEmpty } from '@/utils/index'
import { sportList, stationOrder } from '@/data/constants'
import { Timestamp } from 'firebase/firestore'
import { Init } from '@/types/classes'

type SportFlexible = Sport | 'none' | 'more than 1'

export namespace Base {
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
      return sportsSignedUp > 1 ? 'more than 1' : result
    }
    constructor(props: Init.Team) {
      this.teamName = props.teamName
      this.sport = Team.getSport(props)
      this.direction = props.direction
      this._stationsRemaining = stationOrder[props.direction]
      this.timestamp = 0
      this.members = []
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
    }
    setSport(value: SportFlexible) {
      this.sport = value
    }
    setTeam(teamName: string) {
      this.teamName = teamName
    }
  }
}
