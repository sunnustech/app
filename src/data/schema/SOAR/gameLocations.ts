import { SOARLocation } from '@/types/SOAR'

const Slide = {
  id: 1,
  stationType: 'game',
  title: 'Slide',
  location: 'TODO',
  content: {
    game_title: 'Slide',
    details: 'TODO',
  },
  coordinate: {
    latitude: 1.2959918,
    longitude: 103.780516,
  },
  timetable: [],
  stage: 1,
  phyiscal: true,
  google_map_pin_url: 'https://goo.gl/maps/T1F9XPH1bCcAW1bJA',
}

const Relay2Maze = {
  id: 2,
  stationType: 'game',
  title: 'Relay2Maze',
  location: 'TODO',
  content: {
    game_title: 'Relay2Maze',
    details: 'TODO',
  },
  coordinate: {
    latitude: 1.2995528,
    longitude: 103.7756084,
  },
  timetable: [],
  stage: 1,
  phyiscal: true,
  google_map_pin_url: 'https://goo.gl/maps/sBkDifkxaduGabCA9',
}

const SotongHouze = {
  id: 3,
  stationType: 'game',
  title: 'Sotong Houze',
  location: 'TODO',
  content: {
    game_title: 'Sotong Houze',
    details: 'TODO',
  },
  coordinate: {
    latitude: 1.2967515,
    longitude: 103.7701697,
  },
  timetable: [],
  stage: 1,
  phyiscal: true,
  google_map_pin_url: 'https://goo.gl/maps/PQswbYKbSRPiDs2C8',
}

const SnakeAndLadders = {
  id: 4,
  stationType: 'game',
  title: 'Snake & Ladders',
  location: 'TODO',
  content: {
    game_title: 'Snake & Ladders',
    details: 'TODO',
  },
  coordinate: {
    latitude: 1.2935693,
    longitude: 103.7740868,
  },
  timetable: [],
  stage: 1,
  phyiscal: true,
  google_map_pin_url: 'https://goo.gl/maps/VtG7da41VpvUsrM3A',
}

const GOLF = {
  id: 5,
  stationType: 'game',
  title: 'GOLF',
  location: 'TODO',
  content: {
    game_title: 'GOLF',
    details: 'TODO',
  },
  coordinate: {
    latitude: 1.3050392,
    longitude: 103.7729745,
  },
  timetable: [],
  stage: 1,
  phyiscal: true,
  google_map_pin_url: 'https://goo.gl/maps/zNsCz9JE63cvDtr3A',
}

const NerfBattle = {
  id: 6,
  stationType: 'game',
  title: 'Nerf Battle',
  location: 'TODO',
  content: {
    game_title: 'Nerf Battle',
    details: 'TODO',
  },
  coordinate: {
    latitude: 1.2966335,
    longitude: 103.7728345,
  },
  timetable: [],
  stage: 1,
  phyiscal: true,
  google_map_pin_url: 'https://goo.gl/maps/iDqREtXgp2swi15DA',
}

const gameLocations: Array<SOARLocation> = [
  Slide,
  Relay2Maze,
  SotongHouze,
  SnakeAndLadders,
  GOLF,
  NerfBattle,
]

export default gameLocations
