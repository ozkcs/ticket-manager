import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useCookie } from '../hooks/useCookie';


interface IUserInformation {
  email: string
  isAuthenticated: boolean
}

interface IInitialState extends IUserInformation{
  login: Function
  logout: Function
}

const initialState: IInitialState = {
  email:'',
  isAuthenticated: false,

  login: (email: string, access_token: string) => {},
  logout: () => {},
}

interface IProps {
  children: React.ReactNode | React.ReactElement
}

const TOKEN_ID = 'token_id'

const AuthContext = createContext(initialState)

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}: IProps) => {

  const [userInformation, setUserInformation] = useState<IUserInformation>(initialState)
  const { removeItem, setItem } = useCookie()

  const login = (email: any, accessToken: any, expiration?:any) => {
    setUserInformation({
      email: email,
      isAuthenticated: true,
    })
    setItem(TOKEN_ID, accessToken, expiration)
  }

  const logout = () => {
    setUserInformation({
      email: '',
      isAuthenticated: false,
    })
    removeItem(TOKEN_ID)
  }

  return (
    <AuthContext.Provider value={{ ...userInformation, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider







