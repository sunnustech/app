import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import { Rounds, Sport } from '@/types/TSS'
import { emptyRounds } from '@/data/schema/TSS'

type LastContextProps = {
  roundData: Rounds
  setRoundData: Dispatch<SetStateAction<Rounds>>
  sport: Sport
  setSport: Dispatch<SetStateAction<Sport>>
}

const LastContext = createContext<LastContextProps>({
  roundData: emptyRounds,
  setRoundData: () => {},
  sport: 'volleyball',
  setSport: () => '',
})

const LastProvider = (props: React.PropsWithChildren<{}>) => {
  const [roundData, setRoundData] = useState(emptyRounds)
  const [sport, setSport] = useState<Sport>('volleyball')

  return (
    <LastContext.Provider
      value={{
        roundData,
        setRoundData,
        sport,
        setSport,
      }}
      {...props}
    />
  )
}

export { LastContext, LastProvider }
