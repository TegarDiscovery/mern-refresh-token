import { Button, Container, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import App from "../../layouts/app"
import { useEffect, useState } from "react"
import instance from "../../utils/axios/instance"

function Books() {
  const navigate = useNavigate()
  const [books, setBooks] = useState([])
  const logoutHandler = () => {
    localStorage.clear('access_token')
    localStorage.clear('refresh_token')
    navigate('/login')
  }

  useEffect(()=>{
    async function getData() {
      try {
        const res = await instance.get('http://localhost:3001/books', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        })

        // console.log(res);
        
        setBooks(res.data.data.books)
      } catch (error) {
        // console.log(error);
        if(error.response.status === 401) {
          localStorage.clear('access_token')
          localStorage.clear('refresh_token')
          navigate('/login')
        }
      }
    }

    getData()
  },[])

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
            {books.map((book, i) => (
              <tr key={book.id}>
                <td>{i + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.pages}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button size="sm" variant="danger" onClick={logoutHandler}>Logout</Button>
      </Container>
    </App>
  )
}

export default Books