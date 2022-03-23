import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import WelcomePage from './pages/WelcomePage'
import { useEffect, useState } from 'react'
import RequirePermission from './components/RequirePermission'

const App = () => {
  const [token, setToken] = useState()

  useEffect(() => {
    console.log({ token })
  }, [token])

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
  }

  return (
    <>
      <Navbar />
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
