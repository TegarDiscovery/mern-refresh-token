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
import { useState } from "react"
import instance from "../../utils/axios/instance"

function Login() {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    // cek username dan password 
    // console.log(email);
    // console.log(password);

    try {
      e.preventDefault()

      const res = await instance.post("http://localhost:3001/auth/login", {
        email: email,
        password: password,
      })

      // console.log(res);

      localStorage.setItem('access_token',res.data.data.access_token)
      localStorage.setItem('refresh_token',res.data.data.refresh_token)
      
      navigate('/books')
    } catch (error) {
      console.log(error);
    }
    
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
                <FormControl type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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