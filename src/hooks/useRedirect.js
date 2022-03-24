import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

const useRedirect = () => {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  const goToProfile = useCallback(() => navigate('/profile'), [navigate])

  return { goBack, goToProfile }
}

export default useRedirect
