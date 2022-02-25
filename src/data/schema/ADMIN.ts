import { ADMINLocation, ADMINData } from './ADMIN.d'
import { objFromArray } from './utils'

const testOne: ADMINLocation = {
  id: 3,
  booth_title: 'Medic Point',
  google_map_pin_url: '',
  latitude: 1.25,
  longitude: 103.82,
}

const testTwo: ADMINLocation = {
  id: 4,
  booth_title: 'Water Point',
  google_map_pin_url: '',
  latitude: 1.23,
  longitude: 103.81,
}

const locationList = objFromArray([testOne, testTwo], 'game_title')

const ADMIN: ADMINData = {
  locationList,
}

export default ADMIN
