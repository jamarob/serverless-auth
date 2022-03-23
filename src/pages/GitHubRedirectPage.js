import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const GitHubRedirectPage = ({ onLogin }) => {
  const location = useLocation()

  const search = location.search

  const query = new URLSearchParams(search)

  const code = query.get('code')

  useEffect(() => {
    onLogin(code)
  }, [code, onLogin])

  return null
}

export default GitHubRedirectPage
