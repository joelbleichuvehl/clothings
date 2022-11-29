import React, { createContext, useState, useEffect, useContext } from 'react'
import api from '../services/api'


const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storagedUser = localStorage.getItem('@user')

    if (storagedUser) {
      console.log('aqui');
      setUser(JSON.parse(storagedUser))
    }
  }, [])

  const Login = async (user) => {
    await api.get('/usuarios')
    .then(response => {
      const user_api = response.data[0]

      
      if(user_api.username === user.username){
        if(user_api.password === user.password){
          localStorage.setItem( '@user', JSON.stringify(user))
          
          setUser(user)
        }
      }
    })
  }

  function Logout() {
    setUser(null)

    localStorage.removeItem('@user')
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export  function useAuth() {
  const context = useContext(AuthContext)

  return context
}
