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

  const name = profile?.name || profile?.githubName

  return (
    <main>
      <h1>Profile</h1>
      <p>Hello {name} 👋</p>
    </main>
  )
}

export default ProfilePage
