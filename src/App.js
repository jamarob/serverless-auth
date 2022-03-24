import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import WelcomePage from './pages/WelcomePage'
import { useCallback, useState } from 'react'
import RequirePermission from './components/RequirePermission'
import GitHubRedirectPage from './pages/GitHubRedirectPage'
import {
  postGitHubAuthorizationCode,
  postUsernameAndPassword,
} from './services/api-service'

const App = () => {
  const [token, setToken] = useState()

  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  const goToProfile = useCallback(() => navigate('/profile'), [navigate])

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

  return (
    <>
      <Navbar isAuthorized={token} onLogout={logout} />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/login"
          element={<LoginPage onLogin={loginWithUsernameAndPassword} />}
        />
        <Route
          path="/oauth/redirect"
          element={<GitHubRedirectPage onLogin={loginWithGitHubCode} />}
        />
        <Route
          path="/profile"
          element={
            <RequirePermission token={token}>
              <ProfilePage token={token} />
            </RequirePermission>
          }
        />
      </Routes>
    </>
  )
}

export default App
