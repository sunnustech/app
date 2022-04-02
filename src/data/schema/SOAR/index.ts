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
    },
  },
}

export default SOAR
