import React, { createContext, useState } from 'react'

// Context function to be used
function createUserCtx() {
  var ctx
  function Provider(props: React.PropsWithChildren<{}>) {
    const [userid, setUserid] = useState('')
    const [team, setTeam] = useState('')
    ctx = createContext({
      userid,
      setUserid,
      team,
      setTeam,
    })
    return (
      <ctx.Provider value={{ userid, setUserid, team, setTeam }} {...props} />
    )
  }
  return [ctx, Provider] as const
}

const [UserContext, UserProvider] = createUserCtx()

export { UserContext, UserProvider }
