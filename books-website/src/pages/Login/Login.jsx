import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import App from "../../layouts/app"

import './login.css'

function Login() {
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()

    navigate('/books')
  }

  return (
    <App>
      <Container className="mt-5">
        <Card className="login-form mx-auto">
          <CardHeader>Login</CardHeader>
          <CardBody>
            <Form onSubmit={submitHandler}>
              <FormGroup className="mb-2">
                <FormLabel>Email</FormLabel>
                <FormControl type="email" name="email" />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" name="password" />
              </FormGroup>
              <Button type="submit">Login</Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </App>
  )
}

export default Login