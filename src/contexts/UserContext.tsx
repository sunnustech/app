import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import { auth } from '@/sunnus/firebase'
import { pullDoc } from '@/data/pull'

type UserContextProps = {
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
  team: string
  setTeam: Dispatch<SetStateAction<string>>
  schedule: object
  setSchedule: Dispatch<SetStateAction<object>>
}

const UserContext = createContext<UserContextProps>({
  userId: '',
  setUserId: () => '',
  team: '',
  setTeam: () => '',
  schedule: {},
  setSchedule: () => {},
})

const rehydrateUserData = async ({ setTeam, setUserId, setSchedule }: any) => {
  const emailDictionary = await pullDoc({
    collection: 'participants',
    doc: 'allEmails',
  })
  if (auth.currentUser && auth.currentUser.email) {
    /*
     * theoretically, this if-block will always be reached because
     * rehydrateUserData will only be called if auth is not null
     */
    const user = emailDictionary.data[auth.currentUser?.email]
    setUserId(user.loginId)
    setTeam(user.groupTitle)
    const res2: any = await pullDoc({
      collection: 'participants',
      doc: user.groupTitle,
    })
    const teamData = res2.data
    if (teamData.registeredEvents.TSS) {
      setSchedule(teamData.schedule)
    }
  }
}

const UserProvider = (props: React.PropsWithChildren<{}>) => {
  const [userId, setUserId] = useState('')
  const [team, setTeam] = useState('')
  const [schedule, setSchedule] = useState({})

  /*
   * This is needed because expo only remembers firebase credentials,
   * so we need to rehydrate the user's SunNUS-specific data
   */
  if (userId === '' && auth != null) {
    rehydrateUserData({ setTeam, setUserId, setSchedule })
  }

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        team,
        setTeam,
        schedule,
        setSchedule,
      }}
      {...props}
    />
  )
}

export { UserContext, UserProvider }
