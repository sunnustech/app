import React, { createContext, useState } from 'react'
import { SOARContextProps, SOARLocation, StationOrderProps } from '@/types/SOAR'
import { QR } from '@/classes/QR'
import { Team } from '@/classes/team'
import { Location, LocationList } from '@/classes/location'
import { gameStations as GS } from '@/data/locations'

/*
 * Pulls all soar locations and utilities from the Firestore
 */

// Initializes the context with default values
const SOARContext = createContext<SOARContextProps>({
  loadingState: [false, () => true],
  locationState: [[], () => true],
  stationOrderState: [{ A: [], B: [] }, () => {}],
  displayLocationState: [[], () => []],
  teamState: [Team.empty, () => Team.empty],
  gameStationsState: [[], () => []],
  QRState: [QR.empty, () => QR.empty],
  gameStations: new LocationList([]),
  safetyOfficerPhoneState: ['', () => '']
})

// Creates a context provider with the following default values
function SOARProvider(props: React.PropsWithChildren<{}>) {
  const loadingState = useState(false)
  const QRState = useState(QR.empty)
  const locationState = useState<any>([])
  const stationOrderState = useState<StationOrderProps>({ A: [], B: [] })
  const displayLocationState = useState<Array<SOARLocation>>([])
  const teamState = useState<Team>(Team.empty)
  const gameStationsState = useState<Location[]>(GS)
  const gameStations = new LocationList(GS)
  const safetyOfficerPhoneState = useState('')

  return (
    <SOARContext.Provider
      value={{
        safetyOfficerPhoneState,
        teamState,
        displayLocationState,
        stationOrderState,
        loadingState,
        locationState,
        QRState,
        gameStationsState,
        gameStations
      }}
      {...props}
    />
  )
}

export { SOARContext, SOARProvider }
