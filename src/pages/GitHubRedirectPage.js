import { useEffect } from 'react'
import useQueryCode from '../hooks/useQueryCode'

const GitHubRedirectPage = ({ onLogin }) => {
  const code = useQueryCode()

  useEffect(() => {
    onLogin(code)
  }, [code, onLogin])

  return null
}

export default GitHubRedirectPage
