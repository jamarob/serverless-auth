import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import WelcomePage from './pages/WelcomePage'
import RequirePermission from './components/RequirePermission'
import GitHubRedirectPage from './pages/GitHubRedirectPage'
import useAuth from './hooks/useAuth'

const App = () => {
  const { token, logout, loginWithUsernameAndPassword, loginWithGitHubCode } =
    useAuth()

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
