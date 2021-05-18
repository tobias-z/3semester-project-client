import React from "react";
import { Form, Button } from "react-bootstrap";
import { fetchData } from "../../apiUtils";
import CenteredContainer from "../../components/CenteredContainer";
import { USER } from "../../settings";


const initialValues = {
  userName: "",
  password: "",
};

function SignupPage() {
  const [signupCredentials, setSignupCredentials] =
    React.useState(initialValues);

  const [serverError, setServerError] = React.useState(null);
 

  function handleSubmit(event) {
    event.preventDefault();
    console.log(signupCredentials);
    fetchData(USER.SIGNUP, "POST", signupCredentials).then();
  }

  function handleChange(event) {
    setSignupCredentials({
      ...signupCredentials,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <CenteredContainer>
      <h1>Sign up</h1>
      <Form style={{ width: "400px" }} onSubmit={handleSubmit}>
        {serverError ? (
          <h3 className="text-danger">{serverError.message}</h3>
        ) : null}
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            value={signupCredentials.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={signupCredentials.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </Form.Group>
        <Button block type="submit">
          Sign up
        </Button>
      </Form>
    </CenteredContainer>
  );
}

export default SignupPage;
