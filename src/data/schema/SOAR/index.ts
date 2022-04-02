import { SOARData } from '@/types/SOAR'
import gameLocations from './gameLocations'
import adminLocations from './adminLocations'

const SOAR: SOARData = {
  locations: {
    data: [...gameLocations, ...adminLocations],
    stationOrder: {
      A: [
        'Slide',
        'Sotong Houze',
        'Nerf Battle',
        'Snakes and Ladders',
        'GOLF',
        'Relay2Maze',
      ],
      B: [
        'GOLF',
        'Snakes and Ladders',
        'Nerf Battle',
        'Sotong Houze',
        'Slide',
        'Relay2Maze',
      ],
    },
  },
}

export default SOAR
