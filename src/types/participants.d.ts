export type RegisteredEvent = {
  SOAR?: boolean
  TSS?: {
    volleyball?: boolean
    dodgeball?: boolean
    tchoukball?: boolean
    frisbee?: boolean
  }
}

export type Group = {
  groupTitle: string
  SOAR?: any
  registeredEvents: RegisteredEvent
  members: Array<{
    email: string
    phone: string
    loginId: string
  }>
}

/*
 * To be Firestore-friendly, the final form has to be an object,
 * and first-level values cannot be arrays
 */
export type ParticipantsData = {
  allParticipants: any
  [key: string]: Group
}
