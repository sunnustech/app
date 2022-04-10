import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import { Rounds } from '@/types/TSS'
import { emptyRounds } from '@/data/schema/TSS'

type LastContextProps = {
  roundData: Rounds
  setRoundData: Dispatch<SetStateAction<Rounds>>
}

const LastContext = createContext<LastContextProps>({
  roundData: emptyRounds,
  setRoundData: () => {},
})

const LastProvider = (props: React.PropsWithChildren<{}>) => {
  const [roundData, setRoundData] = useState(emptyRounds)

  return (
    <LastContext.Provider
      value={{
        roundData,
        setRoundData,
      }}
      {...props}
    />
  )
}

export { LastContext, LastProvider }
