import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import WelcomePage from './pages/WelcomePage'
import { useState } from 'react'
import RequirePermission from './components/RequirePermission'

const App = () => {
  const [token, setToken] = useState()

  const navigate = useNavigate()
  const goBack = () => navigate(-1)

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
