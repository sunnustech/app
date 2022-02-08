import { Fontisto as FO, FontAwesome5 as FA } from '@expo/vector-icons'
import { auth, db } from '@/sunnus/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

type GameStation = {
  id: number;
    name: string;
    description: string;
    icon: () => JSX.Element;
    coordinate: {
        latitude: number;
        longitude: number;
    };
    type: string;
    stage: number;
}

// Alternatives?
// State -> But setting state has a delay, and i only want to export this function
// Context -> If i use context for this ill probably need another context for Admin Locations which doesnt seem ideal
const getGameLocations = async () => {
  const docRef = doc(db, 'SOAR', 'locationList')
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const docData = docSnap.data()
      let locationArray: GameStation[] = []
      for (let [key, value] of Object.entries(docData)) {
        locationArray.push({
          id: value.id,
          name: value.game_title,
          description: value.details,
          icon: () => <FO name="beach-slipper" size={42} color="#ef4444" />,
          coordinate: {
            latitude: value.latitude,
            longitude: value.longitude,
          },
          type: 'game',
          stage: value.stage
        })
      }
      return Promise.resolve(locationArray)
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      return Promise.resolve([])
    }
}

export const gameLocations = async () => {
  return await getGameLocations()
}


// MOCK DATA FOR TESTING

/*
[
  {
    id: 1,
    name: "s",
    description: "g",
    icon: () => <FO name="beach-slipper" size={42} color="#ef4444" />,
    coordinate: {
      latitude: 1.258,
      longitude: 103.82,
    },
    type: 'game',
    stage: 0,
  },
  {
    id: 2,
    name: 'Game Station 2',
    description:
      'Supreme Leader Hong Sheng has casually destroyed his opponents',
    icon: () => <FO name="beach-slipper" size={42} color="#ef4444" />,
    coordinate: {
      latitude: 1.257,
      longitude: 103.82,
    },
    type: 'game',
    stage: 1,
  },
]*/


/*
{
        id: 99,
        name: "fail",
        description: "fail",
        icon: () => <FO name="beach-slipper" size={42} color="#ef4444" />,
        coordinate: {
          latitude: 1.28,
          longitude: 103.82,
        },
        type: 'game',
        stage: 1
      }*/