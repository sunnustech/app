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
import { doc, updateDoc } from 'firebase/firestore'
import { newSunNUSTeam } from '@/data/constants'

/*
 * Pulls all users and team related data from the Firestore
 */

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

// Initializes the context with default values
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

/**
 * Updates userid and teamname for each user upon login
 *
 * @param {any} obj Object containg useState setters
 * @param {React.Dispatch<React.SetStateAction<string>>} obj.setTeamName Setter for teamname
 * @param {React.Dispatch<React.SetStateAction<string>>} obj.setUserId Setter for userid
 * @param {React.Dispatch<React.SetStateAction<TeamProps>>} obj.setTeamData Setter for team data
 */
const rehydrateUserData = async ({
  setTeamName,
  setUserId,
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

/**
 * Writes to firebase that user is authenticated
 * 
 * @param {string} token represents user's device
 */
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

// Creates a context provider with the following default values
const UserProvider = (props: React.PropsWithChildren<{}>) => {
  const [userId, setUserId] = useState('')
  const [teamName, setTeamName] = useState('')
  const [schedule, setSchedule] = useState({})
  const [teamData, setTeamData] = useState<TeamProps>(teamDataInit)

  const token = notificationInit().expoPushToken

  useEffect(() => {
    if (token !== '') {
      handlePushTokens(token)
    }
  }, [token])

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
