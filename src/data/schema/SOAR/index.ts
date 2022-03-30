import { SOARData } from '@/types/SOAR'
import gameLocations from './gameLocations'
import adminLocations from './adminLocations'

const SOAR: SOARData = {
  locations: {
    data: [...gameLocations, ...adminLocations],
  },
}

export default SOAR
