import { SOARLocation } from '@/types/SOAR'

const testOne = {
  id: 1,
  type: 'game',
  location: 'The Lair of the Green-eyed Man',
  content: {
    game_title: 'YeetBall',
    details: 'game instructions/intro statement (try to keep it concise!)',
  },
  title: '_Math Dept',
  phyiscal: true,
  google_map_pin_url: 'https://goo.gl/maps/1Zrg21yeCGQJGhK18',
  timetable: [
    {
      time: '15:00',
      group_title: 'Independent_Decorators',
    },
    {
      time: '15:30',
      group_title: 'Gentle_Sweaters',
    },
  ],
  coordinate: {
    // Math Department, S17
    latitude: 1.2977616274812807,
    longitude: 103.78064732396246,
  },
  stage: 0,
}

const testTwo = {
  id: 2,
  type: 'game',
  location: 'Camp Nou',
  content: {
    game_title: 'SheeshJump',
    details: 'gameo instructo',
  },
  title: '_NUS Track',
  phyiscal: false,
  google_map_pin_url: 'https://goo.gl/maps/93QFQ3WP5LnHX5sw9',
  timetable: [
    {
      time: '15:00',
      group_title: 'Poor_Philosophers',
    },
    {
      time: '15:30',
      group_title: 'Irrelevant_Readers',
    },
  ],
  coordinate: {
    // NUS Track
    latitude: 1.2988799275302583,
    longitude: 103.77833179142198,
  },
  stage: 1,
}

const gameLocations = [testOne, testTwo]

export default gameLocations
