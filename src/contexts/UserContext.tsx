import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { auth, db } from '@/sunnus/firebase'
import { pullDoc } from '@/data/pull'
import { TeamProps } from '@/types/participants'
import { notificationInit } from '@/lib/notifications'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { newSunNUSTeam } from '@/data/constants'
import { UseState } from '../types/SOAR'
import { User } from '../classes/user'

type UserContextProps = {
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
  teamName: string
  setTeamName: Dispatch<SetStateAction<string>>
  schedule: object
  setSchedule: Dispatch<SetStateAction<object>>
  teamData: TeamProps
  setTeamData: Dispatch<SetStateAction<TeamProps>>
  userState: UseState<User>
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
  userState: [User.empty, () => {}],
})

const rehydrateUserData = async ({
  setTeamName,
  setUserId,
  setSchedule,
  setTeamData,
}: any) => {
  if (auth.currentUser) {
    /*
     * theoretically, this if-block will always be reached because
     * rehydrateUserData will only be called if auth is not null
     */
    const userData = (
      await pullDoc({
        collection: 'users',
        doc: auth.currentUser.uid,
      })
    ).data
    setUserId(userData.loginId)
    setTeamName(userData.teamName)

    const teamData: any = (
      await pullDoc({
        collection: 'teams',
        doc: userData.teamName,
      })
    ).data

    setTeamData(teamData)
  }
}

async function handlePushTokens(token: string) {
  if (auth.currentUser === null) {
    return
  }
  updateDoc(doc(db, 'users', auth.currentUser.uid), {
    expoPushToken: token,
  }).then(() => {
    console.debug('successfully pushed Expo token to firebase')
  })
}

const UserProvider = (props: React.PropsWithChildren<{}>) => {
  const [userId, setUserId] = useState('')
  const [teamName, setTeamName] = useState('')
  const [schedule, setSchedule] = useState({})
  const [teamData, setTeamData] = useState<TeamProps>(teamDataInit)
  const userState = useState(User.empty)

  const token = notificationInit().expoPushToken

  useEffect(() => {
    if (token !== '') {
      handlePushTokens(token)
    }
  }, [token])

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
        userState,
      }}
      {...props}
    />
  )
}

export { UserContext, UserProvider }
