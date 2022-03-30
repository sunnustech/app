import React, {
  createContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react'
import { Fontisto as FO, FontAwesome5 as FA } from '@expo/vector-icons'
import { db } from '@/sunnus/firebase'
import { doc, DocumentData, getDoc } from 'firebase/firestore'
import { GameStation } from '@/types/GameStation'
import { SOARContextProps } from '@/types/soar-map'

// reference: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/

/*
 * parse game location details from Firestore data
 */
function parseFirestoreGameData(firebaseData: DocumentData) {
  let locationArray: GameStation[] = []
  Object.keys(firebaseData).forEach((key) => {
    const e = firebaseData[key]
    locationArray.push({
      id: e.id,
      name: e.game_title,
      description: e.details,
      icon: () => <FO name="beach-slipper" size={42} color="#ef4444" />,
      coordinate: {
        latitude: e.latitude,
        longitude: e.longitude,
      },
      type: 'game',
      stage: e.stage,
    })
  })
  return locationArray
}

/*
 * parse admin location details from Firestore data
 */
function parseFirestoreAdminData(firebaseData: DocumentData) {
  let locationArray: GameStation[] = []
  Object.keys(firebaseData).forEach((key) => {
    const e = firebaseData[key]
    locationArray.push({
      id: e.id,
      name: e.game_title,
      description: e.details,
      icon: () => <FA name="umbrella-beach" size={42} color="#000000" />,
      coordinate: {
        latitude: e.latitude,
        longitude: e.longitude,
      },
      type: 'admin',
      stage: -1,
    })
  })
  return locationArray
}

/*
 * pulls all locations from the Firestore
 */
const getFirebaseLocations = async (p: {
  setLoading: Dispatch<SetStateAction<boolean>>
  setLocations: Dispatch<SetStateAction<any>>
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
        p.setLocations(locationArray)
      } else {
        console.warn('no data found')
      }
    })
    .catch((err) => {
      console.warn('error fetching admin locations data from Firestore', err)
    })
  p.setLoading(false)
}

// Context function to be used
function createSoarCtx() {
  const ctx = createContext<SOARContextProps>({
    loadingState: [false, () => true],
    locationState: [[], () => true],
    filteredState: [{}, () => {}],
    QRState: ['', () => ''],
  })

  // Getters and setters to be used when using context
  function Provider(props: React.PropsWithChildren<{}>) {
    const loadingState = useState(false)
    const QRState = useState('')
    const locationState = useState<any>({})
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
      })
    }, [])

    return (
      <ctx.Provider
        value={{ loadingState, filteredState, locationState, QRState }}
        {...props}
      />
    )
  }
  // Export a tuple of the default and the functions to use the context
  return [ctx, Provider] as const
}

const [SoarContext, SoarProvider] = createSoarCtx()

export { SoarContext, SoarProvider }
