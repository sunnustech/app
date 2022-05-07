import { Rounds } from '@/types/TSS'
import { createEmptyMatches } from '@/data/utils'
import { Camera } from 'react-native-maps'
import { Sport, Round } from '@/types/TSS'
import { Member, RegisteredEvents } from '@/types/participants'
import { SOARTeamProps } from '@/types/SOAR'

export const NUSCoordinates: Camera = {
  center: { latitude: 1.296674, longitude: 103.77639 },
  pitch: 0,
  zoom: 15.3,
  heading: 0,
  altitude: 0,
}

export const sportList: Array<Sport> = [
  'dodgeball',
  'frisbee',
  'volleyball',
  'tchoukball',
]

export const roundList: Array<Round> = [
  'round_of_32',
  'round_of_16',
  'quarterfinals',
  'semifinals',
  'finals',
]

export const reversedRoundList: Array<Round> = [
  'finals',
  'semifinals',
  'quarterfinals',
  'round_of_16',
  'round_of_32',
]

export const matchNumbers: Record<Round, Array<number>> = {
  finals: [0],
  semifinals: [0, 1],
  quarterfinals: [0, 1, 2, 3],
  round_of_16: [0, 1, 2, 3, 4, 5, 6, 7],
  round_of_32: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
}

export const emptyRounds: Rounds = {
  round_of_32: createEmptyMatches(16),
  round_of_16: createEmptyMatches(8),
  quarterfinals: createEmptyMatches(4),
  semifinals: createEmptyMatches(2),
  finals: createEmptyMatches(1),
  champions: '',
}

export const stationOrder = {
  A: [
    'Slide',
    'Sotong Houze',
    'Nerf Battle',
    'Snake and Ladders',
    'GOLF',
    'Relay2Maze',
  ],
  B: [
    'GOLF',
    'Snake and Ladders',
    'Nerf Battle',
    'Sotong Houze',
    'Slide',
    'Relay2Maze',
  ],
}

const SOARInit: SOARTeamProps = {
  timerRunning: false,
  started: false,
  stopped: false,
  startTime: 0,
  stopTime: 0,
  allEvents: [],
  direction: 'A',
  points: 0,
}

export function newSunNUSTeam(props: {
  members: Array<Member>
  registeredEvents: RegisteredEvents
  direction: 'A' | 'B'
  teamName: string
}) {
  return {
    SOAR: SOARInit,
    SOARStart: 0,
    SOARTimerEvents: [0],
    SOARPausedAt: 0,
    SOARStationsCompleted: [],

    teamName: props.teamName,
    SOARStationsRemaining: stationOrder[props.direction],
    members: props.members,
    registeredEvents: props.registeredEvents,
  }
}
