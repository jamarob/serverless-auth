import useProfile from '../hooks/useProfile'

const ProfilePage = ({ token }) => {
  const { displayName } = useProfile(token)

  return (
    <main>
      <h1>Profile</h1>
      <p>Hello {displayName} 👋</p>
    </main>
  )
}

export default ProfilePage
