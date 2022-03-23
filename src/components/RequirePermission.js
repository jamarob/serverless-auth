import { Navigate } from 'react-router-dom'

const RequirePermission = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/login" />
  }
  return children
}

export default RequirePermission
