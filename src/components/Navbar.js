import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = ({ isAuthorized, onLogout }) => {
  return (
    <Nav>
      <Link to="/">Welcome</Link>
      <Link to="/profile">Profile</Link>
      {isAuthorized ? (
        <button onClick={onLogout}>logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-evenly;
`

export default Navbar
