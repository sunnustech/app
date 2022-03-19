export type Sport = 'dodgeball' | 'frisbee' | 'volleyball' | 'tchoukball'

export type TSSKnockoutTable = {
  round_of_32: {
    [key: number]: { A: string; B: string; winner?: string }
  }
  round_of_16: {
    [key: number]: { A: string; B: string; winner?: string }
  }
  quarterfinals: {
    [key: number]: { A: string; B: string; winner?: string }
  }
  semifinals: {
    [key: number]: { A: string; B: string; winner?: string }
  }
  finals: {
    [key: number]: { A: string; B: string; winner?: string }
  }
  champions: string
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
