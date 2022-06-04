import React, { createContext, useState } from 'react'
import { SOARContextProps, SOARLocation, StationOrderProps } from '@/types/SOAR'
import { QR } from '@/classes/QR'
import { Team } from '@/classes/team'
import { Location, LocationList } from '@/classes/location'
import { gameStations as GS } from '@/data/locations'
import { Sport } from '@/types/TSS'

// reference: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/

/*
 * pulls all locations from the Firestore
 */

const SOARContext = createContext<SOARContextProps>({
  loadingState: [false, () => true],
  locationState: [[], () => true],
  stationOrderState: [{ A: [], B: [] }, () => {}],
  displayLocationState: [[], () => []],
  teamState: [Team.empty, () => Team.empty],
  gameStationsState: [[], () => []],
  QRState: [QR.empty, () => QR.empty],
  gameStations: new LocationList([]),
  safetyOfficerPhoneState: ['', () => ''],
  scheduleSportState: ['volleyball', () => 'volleyball']
})

// Getters and setters to be used when using context
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
  const scheduleSportState = useState<Sport>('volleyball')

  return (
    <SOARContext.Provider
      value={{
        scheduleSportState,
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
