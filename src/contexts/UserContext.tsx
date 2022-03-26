import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

type UserContextProps = {
  userid: string
  setUserid: Dispatch<SetStateAction<string>>
  team: string
  setTeam: Dispatch<SetStateAction<string>>
}

const createUserContext = () => {
  const UserContext = createContext<UserContextProps>({
    userid: '',
    setUserid: () => '',
    team: '',
    setTeam: () => '',
  })
  const UserProvider = (props: React.PropsWithChildren<{}>) => {
    const [userid, setUserid] = useState('')
    const [team, setTeam] = useState('')
    return (
      <UserContext.Provider
        value={{
          userid,
          setUserid,
          team,
          setTeam,
        }}
        {...props}
      />
    )
  }
  return [UserContext, UserProvider] as const
}

const [UserContext, UserProvider] = createUserContext()
export { UserContext, UserProvider }
