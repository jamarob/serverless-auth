import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = () => {
  return (
    <Nav>
      <Link to="/">Welcome</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-evenly;
`

export default Navbar
