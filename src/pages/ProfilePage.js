import { useEffect, useState } from 'react'

const ProfilePage = ({ token }) => {
  const [profile, setProfile] = useState()

  useEffect(() => {
    fetch('/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setProfile)
  }, [token])

  return (
    <main>
      <h1>Profile</h1>
      <p>Hello {profile?.name} 👋</p>
    </main>
  )
}

export default ProfilePage
