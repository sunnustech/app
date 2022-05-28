import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import { Rounds, Sport } from '@/types/TSS'
import { emptyRounds } from '@/data/constants'
import { Event } from '@/types/schedule'

/*
 * Pulls all tss related data from the Firestore
 */

type LastContextProps = {
  roundData: Rounds
  setRoundData: Dispatch<SetStateAction<Rounds>>
  sport: Sport
  setSport: Dispatch<SetStateAction<Sport>>
  schedule: Event[]
  setSchedule: Dispatch<SetStateAction<Event[]>>
}

// Initializes the context with default values
const LastContext = createContext<LastContextProps>({
  roundData: emptyRounds,
  setRoundData: () => {},
  sport: 'volleyball',
  setSport: () => '',
  schedule: [],
  setSchedule: () => [],
})

// Creates a context provider with the following default values
const LastProvider = (props: React.PropsWithChildren<{}>) => {
  const [roundData, setRoundData] = useState(emptyRounds)
  const [sport, setSport] = useState<Sport>('volleyball')
  const [schedule, setSchedule] = useState<Event[]>([])

  return (
    <LastContext.Provider
      value={{
        roundData,
        setRoundData,
        sport,
        setSport,
        schedule,
        setSchedule,
      }}
      {...props}
    />
  )
}

export { LastContext, LastProvider }
