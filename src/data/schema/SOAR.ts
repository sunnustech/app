import { SOARLocation, SOARData } from './SOAR.d'
import { objFromArray } from './utils'

const testOne: SOARLocation = {
  id: 1,
  location: 'The Lair of the Green-eyed Man',
  game_title: 'YeetBall',
  phyiscal: true,
  details: 'game instructions/intro statement (try to keep it concise!)',
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
  latitude: 1.261,
  longitude: 103.81,
  stage: 0,
}

const testTwo: SOARLocation = {
  id: 2,
  location: 'Camp Nou',
  game_title: 'SheeshJump',
  phyiscal: false,
  details: 'gameo instructo',
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
  latitude: 1.261,
  longitude: 103.82,
  stage: 1,
}

const locationList = objFromArray([testOne, testTwo], 'game_title')

const SOAR: SOARData = {
  locationList,
}

export default SOAR
