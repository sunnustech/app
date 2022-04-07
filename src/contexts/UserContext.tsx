import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import { auth, db } from '@/sunnus/firebase'
import { pullDoc } from '@/data/pull'
import { TeamProps } from '@/types/participants'
import { SOARTeamProps } from '@/types/SOAR'
import { notificationInit } from '@/lib/notifications'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { newSunNUSTeam } from '@/data/schema/participants'

type UserContextProps = {
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
  teamName: string
  setTeamName: Dispatch<SetStateAction<string>>
  schedule: object
  setSchedule: Dispatch<SetStateAction<object>>
  teamData: TeamProps
  setTeamData: Dispatch<SetStateAction<TeamProps>>
}

const teamDataInit = newSunNUSTeam({
  members: [],
  registeredEvents: {},
  direction: 'A',
  teamName: '',
})

const UserContext = createContext<UserContextProps>({
  userId: '',
  setUserId: () => '',
  teamName: '',
  setTeamName: () => '',
  schedule: {},
  setSchedule: () => {},
  teamData: teamDataInit,
  setTeamData: () => {},
})

const rehydrateUserData = async ({
  setTeamName,
  setUserId,
  setSchedule,
  setTeamData,
}: any) => {
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
    setTeamName(user.teamName)
    const res2: any = await pullDoc({
      collection: 'participants',
      doc: user.teamName,
    })
    const teamData = res2.data
    setTeamData(teamData)
    if (teamData.registeredEvents.TSS) {
      setSchedule(teamData.schedule)
    }
  }
}

async function handlePushTokens(token: string) {
  updateDoc(doc(db, 'notifications', 'expo'), {
    pushTokens: arrayUnion(token),
  }).then(() => {
    console.log('successfully pushed Expo token to firebase')
  })
}

const UserProvider = (props: React.PropsWithChildren<{}>) => {
  const [userId, setUserId] = useState('')
  const [teamName, setTeamName] = useState('')
  const [schedule, setSchedule] = useState({})
  const [teamData, setTeamData] = useState<TeamProps>(teamDataInit)

  const token = notificationInit().expoPushToken
  handlePushTokens(token)

  /*
   * This is needed because expo only remembers firebase credentials,
   * so we need to rehydrate the user's SunNUS-specific data
   */
  if (userId === '' && auth != null) {
    rehydrateUserData({ setTeamName, setUserId, setSchedule, setTeamData })
  }

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        teamName,
        setTeamName,
        schedule,
        setSchedule,
        teamData,
        setTeamData,
      }}
      {...props}
    />
  )
}

export { UserContext, UserProvider }
