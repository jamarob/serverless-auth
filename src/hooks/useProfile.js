import { useEffect, useState } from 'react'
import { getProfile } from '../services/api-service'

const useProfile = token => {
  const [profile, setProfile] = useState()

  useEffect(() => {
    getProfile(token).then(setProfile).catch(console.error)
  }, [token])

  const displayName = profile?.name || profile?.githubName

  return { displayName, profile }
}

export default useProfile
