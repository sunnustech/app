import { SOARLocation } from '@/sunnus/src/types/SOAR'

const waterPoints: Array<SOARLocation> = [
  {
    id: 10,
    stationType: 'water',
    title: '_UTown Green',
    location: '',
    content: {
      game_title: '',
      details: '',
    },
    coordinate: {
      // UTown Green
      latitude: 1.3049891103654925,
      longitude: 103.77322845557454,
    },
    physical: true,
    stage: 0,
    timetable: [],
    google_map_pin_url: '',
  },
  {
    id: 20,
    stationType: 'water',
    location: '',
    content: {
      game_title: '',
      details: '',
    },
    title: '_NUH',
    google_map_pin_url: '',
    coordinate: {
      // NUH
      latitude: 1.2941740290024657,
      longitude: 103.78306481546151,
    },
    physical: true,
    stage: 0,
    timetable: [],
  },
]

const adminLocations: Array<SOARLocation> = [...waterPoints]

export default adminLocations
