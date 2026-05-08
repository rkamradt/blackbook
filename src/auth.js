import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchUser } from './user.js'

export const useAuth = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

  useEffect(() => {
    if (isAuthenticated) {
      setUser(null)
      getAccessTokenSilently()
        .then(token => {
          setAccessToken(token)
          return fetchUser(token)
        })
        .then(setUser)
    } else {
      setUser(null)
      setAccessToken(null)
    }
  }, [isAuthenticated, getAccessTokenSilently])

  return [isAuthenticated, user, setUser, accessToken]
}
