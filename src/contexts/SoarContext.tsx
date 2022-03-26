import React, { createContext, useState, useEffect } from 'react'
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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  updateFilterLocations: React.Dispatch<React.SetStateAction<GameStation[]>>
  updateGameLocations: React.Dispatch<React.SetStateAction<GameStation[]>>
  updateAdminLocations: React.Dispatch<React.SetStateAction<GameStation[]>>
}) => {
  p.setLoading(true)
  let allLocations: GameStation[] = []
  const gameDocRef = doc(db, 'SOAR', 'locationList')
  await getDoc(gameDocRef)
    .then((doc) => {
      /*
       * doc is an object, so to get the data itself,
       * you still need to call its data() method.
       * it will return a pure JS object of data.
       */
      const firebaseData = doc.data()
      if (firebaseData) {
        const locationArray = parseFirestoreGameData(firebaseData)
        allLocations = locationArray
        p.updateGameLocations(locationArray)
      }
    })
    .catch((err) => {
      console.log('error fetching game locations data from Firestore', err)
    })
  const adminDocRef = doc(db, 'ADMIN', 'locationList')
  await getDoc(adminDocRef)
    .then((doc) => {
      /*
       * doc is an object, so to get the data itself,
       * you still need to call its data() method.
       * it will return a pure JS object of data.
       */
      const firebaseData = doc.data()
      if (firebaseData) {
        const locationArray = parseFirestoreAdminData(firebaseData)
        allLocations = [...allLocations, ...locationArray]
        p.updateAdminLocations(locationArray)
      }
    })
    .catch((err) => {
      console.log('error fetching admin locations data from Firestore', err)
    })
  p.updateFilterLocations(allLocations)
  p.setLoading(false)
}

// Context function to be used
function createSoarCtx() {
  const ctx = createContext<SOARContextProps>({
    loading: false,
    filterLocations: [],
    updateFilterLocations: () => [],
    gameLocations: [],
    updateGameLocations: () => [],
    adminLocations: [],
    updateAdminLocations: () => [],
  })

  // Getters and setters to be used when using context
  function Provider(props: React.PropsWithChildren<{}>) {
    const [loading, setLoading] = useState(false)
    const [gameLocations, updateGameLocations] = useState<Array<GameStation>>(
      []
    )
    const [adminLocations, updateAdminLocations] = useState<Array<GameStation>>(
      []
    )

    /* main enabler of async-ness */
    useEffect(() => {
      getFirebaseLocations({
        setLoading,
        updateFilterLocations,
        updateGameLocations,
        updateAdminLocations,
      })
    }, [])

    const [filterLocations, updateFilterLocations] = useState<
      Array<GameStation>
    >([])

    return (
      <ctx.Provider
        value={{
          loading,
          filterLocations,
          updateFilterLocations,
          gameLocations,
          updateGameLocations,
          adminLocations,
          updateAdminLocations,
        }}
        {...props}
      />
    )
  }
  // Export a tuple of the default and the functions to use the context
  return [ctx, Provider] as const
}

const [SoarContext, SoarProvider] = createSoarCtx()

export { SoarContext, SoarProvider }
