import React, { createContext, useState } from 'react'

// reference: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/

// Context function to be used
export function createSoarCtx<A>(defaultValue: A) {
  // Defining type of update function
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>
  // Function of defaultUpdate returns object of type A, in our case an int
  const defaultUpdate: UpdateType = () => defaultValue
  // Initialize a default
  const ctx = createContext({
    filterLocations: defaultValue,
    updateFilterLocations: defaultUpdate,
  })

  // Getters and setters to be used when using context
  function Provider(props: React.PropsWithChildren<{}>) {
    const [filterLocations, updateFilterLocations] = useState(defaultValue)
    return <ctx.Provider value={{ filterLocations, updateFilterLocations }} {...props} />
  }
  // Export a tuple of the default and the functions to use the context
  return [ctx, Provider] as const
}
