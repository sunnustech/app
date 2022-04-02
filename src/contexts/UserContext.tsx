import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import { auth } from '@/sunnus/firebase'
import { pullDoc } from '@/data/pull'
import { SunNUSTeamData } from '@/types/participants'
import { SOARTeamData } from '@/types/SOAR'

type UserContextProps = {
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
  teamName: string
  setTeamName: Dispatch<SetStateAction<string>>
  schedule: object
  setSchedule: Dispatch<SetStateAction<object>>
  teamData: SunNUSTeamData
  setTeamData: Dispatch<SetStateAction<SunNUSTeamData>>
}

const SOARinit: SOARTeamData = {
  timerRunning: false,
  started: false,
  stopped: false,
  startTime: {},
  stopTime: {},
  timerEvents: [],
  lastPause: {},
  lastResume: {},
  direction: 'A',
  stationsCompleted: [],
  points: 0,
}

const teamDataInit = {
  members: [{ email: '', phone: '', loginId: '' }],
  SOAR: SOARinit,
  groupTitle: '',
}

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
    setTeamName(user.groupTitle)
    const res2: any = await pullDoc({
      collection: 'participants',
      doc: user.groupTitle,
    })
    const teamData = res2.data
    setTeamData(teamData)
    if (teamData.registeredEvents.TSS) {
      setSchedule(teamData.schedule)
    }
  }
}

const UserProvider = (props: React.PropsWithChildren<{}>) => {
  const [userId, setUserId] = useState('')
  const [teamName, setTeamName] = useState('')
  const [schedule, setSchedule] = useState({})
  const [teamData, setTeamData] = useState({})

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
