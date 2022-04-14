import { Camera } from 'react-native-maps'
import { Sport, Round } from '@/types/TSS'

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
