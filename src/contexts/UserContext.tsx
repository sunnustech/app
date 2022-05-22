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
  userState: UseState<User>
}

const teamDataInit = newSunNUSTeam({
  members: [],
  registeredEvents: {},
  direction: 'A',
  teamName: '',
})

const UserContext = createContext<UserContextProps>({
  userState: [User.empty, () => {}],
})

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
        userState,
      }}
      {...props}
    />
  )
}

export { UserContext, UserProvider }
