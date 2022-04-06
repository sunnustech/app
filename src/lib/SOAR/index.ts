/*
 * this will be a suite of functions that SOAR will use to interact with firebase
 */

import SOAR from './QRFirebase'
import { SOARLocation, SOARTeamData } from '@/types/SOAR'

export function getLocations(
  locations: Array<SOARLocation>,
  filtered: any,
  SOARData: SOARTeamData
) {
  /* remove all game stations (so we only add in the next game station) */
  const noGames = locations.filter((loc) => loc.stationType !== 'game')

  const gameStations: Array<SOARLocation> = locations.filter(
    (loc) => loc.stationType === 'game'
  )

  /* note that groupStationOrder is a sorted array of stations
   * that the group will go to, in the order of visiting.
   *
   * so it suffices to take the first result that hasn't been completed.
   */
  const rem = SOARData.stationsRemaining
  const com = SOARData.stationsCompleted

  gameStations.forEach((stn) => {
    // reset status for each call
    stn.status = ''
    if (com.length > 0 && com.includes(stn.title)) {
      stn.status = 'done'
    } else if (rem.length > 0 && stn.title === rem[0]) {
      stn.status = 'next'
    }
  })

  /* apply water/medic station filter */
  return [...noGames, ...gameStations].filter(
    (loc) => filtered[loc.stationType]
  )
}

export default SOAR
