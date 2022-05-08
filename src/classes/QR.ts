import { flatten } from "./firebase"
import { Team } from "./team"

export type QRProps = {
  command: string
  points: number
  facilitator: string
  station: string
  teamName: string
}

export class QR {
  command: string
  points: number
  facilitator: string
  station: string
  teamName: string
  static emptyFlat: QRProps = {
    command: '',
    points: 0,
    facilitator: '',
    station: '',
    teamName: '',
  }
  static empty: QR = {
    command: '',
    points: 0,
    facilitator: '',
    station: '',
    teamName: '',
    checkStation: () => true,
    flatten: () => this.emptyFlat
  }
  constructor(props: QRProps) {
    if (!props.facilitator || props.facilitator === '') {
      // nullify if no facilitator
      this.command = ''
      this.points = 0
      this.facilitator = ''
      this.station = ''
      this.teamName = ''
    }
    this.facilitator = props.facilitator
    this.station = props.station || ''
    this.command = props.command || ''
    this.points = props.points || 0
    this.teamName = props.teamName || ''
  }
  checkStation(team: Team): boolean {
    if (team._stationsRemaining.length === 0) {
      return false
    }
    return this.station === team._stationsRemaining[0]
  }
  flatten(): QRProps {
    return flatten.qr(this)
  }
}
