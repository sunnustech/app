import { SOARTeamData } from './SOAR'

type SOARRegistration = {
  SOAR: boolean
}

type TSSRegistration = {} | {}

export type Group = {
  groupTitle: string
  SOAR: SOARTeamData
  members: Array<{
    email: string
    phone: string
    loginId: string
  }>
  registeredEvents?: {
    TSS?: {
      volleyball?: boolean
      dodgeball?: boolean
      tchoukball?: boolean
      frisbee?: boolean
    }
    SOAR?: boolean
  }
}

export type SunNUSTeamData = Group

/*
 * To be Firestore-friendly, the final form has to be an object,
 * and first-level values cannot be arrays
 */
export type ParticipantsData = {
  allLoginIds: any
  allEmails: any
  [key: string]: Group
}
