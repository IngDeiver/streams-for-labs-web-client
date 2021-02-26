import { createContext, useState } from 'react'

export const AppContext = createContext(undefined)

// Provider the sesion to all components
export const AppProvider = ({children}) => {
    
    const [sesion, setSesion] = useState(null) // The sesion (jwt or azure-ad)
    const [user, setUser] = useState(null) // The user authenticated
    const [selectingFilesToRemove, setSelectingFilesToRemove] = useState(false)

    return (
        <AppContext.Provider value = {[sesion,  setSesion, setUser, user, selectingFilesToRemove, setSelectingFilesToRemove]}>
            {children}
        </AppContext.Provider>
    )
}