export type Sport = 'dodgeball' | 'frisbee' | 'volleyball' | 'tchoukball'

export type TSSKnockoutTable = {
  round_of_32: {
    0: [string, string]
    1: [string, string]
    2: [string, string]
    3: [string, string]
    4: [string, string]
    5: [string, string]
    6: [string, string]
    7: [string, string]
    8: [string, string]
    9: [string, string]
    10: [string, string]
    11: [string, string]
    12: [string, string]
    13: [string, string]
    14: [string, string]
    15: [string, string]
  }
  round_of_16: {
    0: [string, string]
    1: [string, string]
    2: [string, string]
    3: [string, string]
    4: [string, string]
    5: [string, string]
    6: [string, string]
    7: [string, string]
  }
  quarterfinals: {
    0: [string, string]
    1: [string, string]
    2: [string, string]
    3: [string, string]
  }
  semifinals: {
    0: [string, string]
    1: [string, string]
  }
  finals: {
    0: [string, string]
  }
  champion: string
}

export type TSSEvents = {
  [key: string]: TSSKnockoutTable
}

export type TSSSchedule = Array<{
  title: string
  time: string
  venue: string
}>

/*
 * To be Firestore-friendly, the final form has to be an object,
 * and first-level values cannot be arrays
 */
export type TSSData = {
  dodgeball: TSSKnockoutTable
  frisbee: TSSKnockoutTable
  volleyball: TSSKnockoutTable
  tchoukball: TSSKnockoutTable
  data: {
    schedule: TSSSchedule
  }
}
