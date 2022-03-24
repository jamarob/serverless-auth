import { useLocation } from 'react-router-dom'

const useQueryCode = () => {
  const location = useLocation()

  const search = location.search

  const query = new URLSearchParams(search)

  return query.get('code')
}

export default useQueryCode
