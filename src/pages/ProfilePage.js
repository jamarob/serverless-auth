import { useEffect, useState } from 'react'
import { getProfile } from '../services/api-service'

const ProfilePage = ({ token }) => {
  const [profile, setProfile] = useState()

  useEffect(() => {
    getProfile(token).then(setProfile)
  }, [token])

  const name = profile?.name || profile?.githubName

  return (
    <main>
      <h1>Profile</h1>
      <p>Hello {name} 👋</p>
    </main>
  )
}

export default ProfilePage
