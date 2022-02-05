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
  group_title: string
  id: string
  registered_events: RegisteredEvent
  members: Array<{
    email: string
    phone: string
  }>
}

/*
 * To be Firestore-friendly, the final form has to be an object,
 * and first-level values cannot be arrays
 */
export type ParticipantsData = {
  [key: string]: Group
}
