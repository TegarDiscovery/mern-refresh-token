import { Button, Container, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import App from "../../layouts/app"

function Books() {
  const navigate = useNavigate()
  const logoutHandler = () => {
    navigate('/login')
  }

  return (
    <App>
      <Container className="mt-5">
        <Table striped hover bordered>
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Penulis</th>
              <th>Jumlah Halaman</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Liburan di Gunung Kembar</td>
              <td>Mario</td>
              <td>123</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Liburan di Gunung Kembar</td>
              <td>Mario</td>
              <td>123</td>
            </tr>
          </tbody>
        </Table>
        <Button size="sm" variant="danger" onClick={logoutHandler}>Logout</Button>
      </Container>
    </App>
  )
}

export default Books