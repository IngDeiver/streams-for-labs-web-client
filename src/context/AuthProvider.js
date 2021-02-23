import { createContext, useState } from 'react'

export const AuthConext = createContext(undefined)

// Provider the sesion to all components
export const AuthProvider = ({children}) => {
    
    const [sesion, setSesion] = useState(null) // The sesion (jwt or azure-ad)
    const [user, setUser] = useState(null) // The user authenticated

    return (
        <AuthConext.Provider value = {[sesion,  setSesion, user, setUser]}>
            {children}
        </AuthConext.Provider>
    )
}