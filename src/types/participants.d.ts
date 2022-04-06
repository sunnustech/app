import { SOARTeamData } from './SOAR'

type SOARRegistration = {
  SOAR: boolean
}

type TSSRegistration = {} | {}

export type Member = {
  email: string
  phone: string
  loginId: string
}

export type RegisteredEvents = {
  TSS?: {
    volleyball?: boolean
    dodgeball?: boolean
    tchoukball?: boolean
    frisbee?: boolean
  }
  SOAR?: boolean
}

export type TeamProps = {
  groupTitle: string
  members: Array<Member>
  registeredEvents?: RegisteredEvents
  SOAR: SOARTeamData
  SOARTimerEvents: Array<number>
  SOARStart: number
  SOARPausedAt: number
  SOARStationsCompleted: Array<string>
  SOARStationsRemaining: Array<string>
}

/*
 * To be Firestore-friendly, the final form has to be an object,
 * and first-level values cannot be arrays
 */
export type ParticipantsData = {
  allLoginIds: any
  allEmails: any
  [key: string]: TeamProps
}
