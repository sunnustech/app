import React, {
  createContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react'
import { db } from '@/sunnus/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { SOARContextProps, StationOrderProps } from '@/types/SOAR'
import { emptyQR } from '@/lib/SOAR/QRCommands'
import { QR } from '@/classes/QR'

// reference: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/

/*
 * pulls all locations from the Firestore
 */

const getFirebaseLocations = async (p: {
  setLoading: Dispatch<SetStateAction<boolean>>
  setLocations: Dispatch<SetStateAction<any>>
  setStationOrderState: Dispatch<SetStateAction<StationOrderProps>>
}) => {
  p.setLoading(true)
  await getDoc(doc(db, 'SOAR', 'locations'))
    .then((doc) => {
      /*
       * doc is an object, so to get the data itself,
       * you still need to call its data() method.
       * it will return a pure JS object of data.
       */
      const firebaseData = doc.data()
      if (firebaseData) {
        const locationArray = firebaseData.data
        const stationOrderArray = firebaseData.stationOrder
        p.setLocations(locationArray)
        p.setStationOrderState(stationOrderArray)
      } else {
        console.warn('no data found')
      }
    })
    .catch((err) => {
      console.warn('error fetching admin locations data from Firestore', err)
    })
  p.setLoading(false)
}

const SOARContext = createContext<SOARContextProps>({
  loadingState: [false, () => true],
  locationState: [[], () => true],
  stationOrderState: [{ A: [], B: [] }, () => {}],
  filteredState: [
    {
      game: true,
      water: false,
      medic: false,
    },
    () => {},
  ],
  scanningState: [false, () => true],
  QRState: [QR.empty, () => QR.empty],
})

// Getters and setters to be used when using context
function SOARProvider(props: React.PropsWithChildren<{}>) {
  const loadingState = useState(false)
  const scanningState = useState(false)
  const QRState = useState(emptyQR)
  const locationState = useState<any>([])
  const stationOrderState = useState<StationOrderProps>({ A: [], B: [] })
  const filteredState = useState<any>({
    game: true,
    water: false,
    medic: false,
  })

  /* main enabler of async-ness */
  useEffect(() => {
    getFirebaseLocations({
      setLoading: loadingState[1],
      setLocations: locationState[1],
      setStationOrderState: stationOrderState[1],
    })
  }, [])

  return (
    <SOARContext.Provider
      value={{
        stationOrderState,
        loadingState,
        filteredState,
        locationState,
        QRState,
        scanningState,
      }}
      {...props}
    />
  )
}

export { SOARContext, SOARProvider }
