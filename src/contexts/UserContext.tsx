import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

type UserContextProps = {
  userid: string
  setUserid: Dispatch<SetStateAction<string>>
  team: string
  setTeam: Dispatch<SetStateAction<string>>
  schedule: object
  setSchedule: Dispatch<SetStateAction<object>>
}

const createUserContext = () => {
  const UserContext = createContext<UserContextProps>({
    userid: '',
    setUserid: () => '',
    team: '',
    setTeam: () => '',
    schedule: {},
    setSchedule: () => {}
  })
  const UserProvider = (props: React.PropsWithChildren<{}>) => {
    const [userid, setUserid] = useState('')
    const [team, setTeam] = useState('')
    const [schedule, setSchedule] = useState({})
    return (
      <UserContext.Provider
        value={{
          userid,
          setUserid,
          team,
          setTeam,
          schedule,
          setSchedule
        }}
        {...props}
      />
    )
  }
  return [UserContext, UserProvider] as const
}

const [UserContext, UserProvider] = createUserContext()
export { UserContext, UserProvider }
