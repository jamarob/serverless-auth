import { useCallback, useState } from 'react'
import useRedirect from './useRedirect'
import {
  postGitHubAuthorizationCode,
  postUsernameAndPassword,
} from '../services/api-service'

const useAuth = () => {
  const [token, setToken] = useState()

  const { goBack, goToProfile } = useRedirect()

  const loginWithUsernameAndPassword = credentials =>
    postUsernameAndPassword(credentials)
      .then(setToken)
      .then(goBack)
      .catch(console.error)

  const loginWithGitHubCode = useCallback(
    code =>
      postGitHubAuthorizationCode(code)
        .then(setToken)
        .then(goToProfile)
        .catch(console.error),
    [goToProfile]
  )

  const logout = () => {
    setToken()
  }

  return { token, loginWithUsernameAndPassword, loginWithGitHubCode, logout }
}

export default useAuth
