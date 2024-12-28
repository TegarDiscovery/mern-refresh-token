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
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import App from "../../layouts/app";

import "./register.css";
import { useState } from "react";
import instance from "../../utils/axios/instance";

function Register() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    // cek username dan password
    // console.log(email);
    // console.log(password);

    try {
      e.preventDefault();

      const res = await instance.post("http://localhost:3001/auth/register", {
        full_name: fullname,
        email: email,
        password: password,
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <App>
      <Container className="mt-5">
        <Card className="register-form mx-auto">
          <CardHeader>Register</CardHeader>
          <CardBody>
            <Form onSubmit={submitHandler}>
              <FormGroup className="mb-3">
                <FormLabel>Fullname</FormLabel>
                <FormControl
                  type="text"
                  name="full_name"
                  onChange={(e) => setFullname(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel>Email</FormLabel>
                <FormControl
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>Password</FormLabel>
                <FormControl
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button type="submit">Register</Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </App>
  );
}

export default Register;
