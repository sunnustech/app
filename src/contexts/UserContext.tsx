import React, { createContext, useEffect, useState } from 'react'
import { auth, db } from '@/sunnus/firebase'
import { notificationInit } from '@/lib/notifications'
import { doc, updateDoc } from 'firebase/firestore'
import { UseState } from '../types/SOAR'
import { User } from '../classes/user'

type UserContextProps = {
  userState: UseState<User>
}

const UserContext = createContext<UserContextProps>({
  userState: [User.empty, () => {}],
})

async function handlePushTokens(token: string) {
  if (auth.currentUser === null) return
  updateDoc(doc(db, 'users', auth.currentUser.uid), {
    expoPushToken: token,
  }).catch(() => {
    console.debug('failed to pushed Expo token to firebase')
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
