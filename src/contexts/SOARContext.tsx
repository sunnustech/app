import React, { createContext, useState } from 'react'
import { SOARContextProps, SOARLocation, StationOrderProps } from '@/types/SOAR'
import { QR } from '@/classes/QR'
import { Team } from '@/classes/team'

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
  QRState: [QR.empty, () => QR.empty],
})

// Getters and setters to be used when using context
function SOARProvider(props: React.PropsWithChildren<{}>) {
  const loadingState = useState(false)
  const QRState = useState(QR.empty)
  const locationState = useState<any>([])
  const stationOrderState = useState<StationOrderProps>({ A: [], B: [] })
  const displayLocationState = useState<Array<SOARLocation>>([])
  const teamState = useState<Team>(Team.empty)

  return (
    <SOARContext.Provider
      value={{
        teamState,
        displayLocationState,
        stationOrderState,
        loadingState,
        locationState,
        QRState,
      }}
      {...props}
    />
  )
}

export { SOARContext, SOARProvider }
