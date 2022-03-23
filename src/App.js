import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import WelcomePage from './pages/WelcomePage'
import { useCallback, useState } from 'react'
import RequirePermission from './components/RequirePermission'
import GitHubRedirectPage from './pages/GitHubRedirectPage'

const App = () => {
  const [token, setToken] = useState()

  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  const goToProfile = useCallback(() => navigate('/profile'), [navigate])

  const loginWithUsernameAndPassword = credentials => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(res => res.json())
      .then(setToken)
      .then(goBack)
  }

  const loginWithGitHubCode = useCallback(
    code => {
      fetch('/api/github-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(res => res.json())
        .then(setToken)
        .then(goToProfile)
    },
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
