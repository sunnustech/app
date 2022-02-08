import React, { createContext, useState, useContext, useEffect } from 'react'
import { Fontisto as FO } from '@expo/vector-icons'
import { db } from '@/sunnus/firebase'
import { doc, getDoc } from 'firebase/firestore'

// reference: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/

type GameStation = {
  id: number
  name: string
  description: string
  icon: () => JSX.Element
  coordinate: {
    latitude: number
    longitude: number
  }
  type: string
  stage: number
}

/*
 * parse game location details from Firestore data
 */
function parseFirestoreData(firebaseData) {
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
 * pulls game locations from the Firestore
 */
const getFirebaseLocations = async ({ setLoading, updateFilterLocations }) => {
  setLoading(true)
  const docRef = doc(db, 'SOAR', 'locationList')
  await getDoc(docRef)
    .then((doc) => {
      /*
       * doc is an object, so to get the data itself,
       * you still need to call its data() method.
       * it will return a pure JS object of data.
       */
      const firebaseData = doc.data()
      if (firebaseData) {
        const locationArray = parseFirestoreData(firebaseData)
        updateFilterLocations(locationArray)
      }
    })
    .catch((err) => {
      console.log('error fetching locations data from Firestore', err)
    })
  setLoading(false)
}

// Context function to be used
export function createSoarCtx() {
  const ctx = createContext({
    filterLocations: [],
    updateFilterLocations: () => [],
  })

  // Getters and setters to be used when using context
  function Provider(props: React.PropsWithChildren<{}>) {
    const [loading, setLoading] = useState(false)

    /* main enabler of async-ness */
    useEffect(() => {
      getFirebaseLocations({ setLoading, updateFilterLocations })
    }, [])

    const [filterLocations, updateFilterLocations] = useState<
      Array<GameStation>
    >([])

    return (
      <ctx.Provider
        value={{ loading, filterLocations, updateFilterLocations }}
        {...props}
      />
    )
  }
  // Export a tuple of the default and the functions to use the context
  return [ctx, Provider] as const
}
