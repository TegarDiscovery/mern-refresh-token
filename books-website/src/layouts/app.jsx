import { Container, Navbar } from "react-bootstrap"
import PropTypes from 'prop-types'

function App({ children }) {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">My Books</Navbar.Brand>
        </Container>
      </Navbar>
      {children}
    </>
  )
}
App.propTypes = {
  children: PropTypes.element,
}

export default App