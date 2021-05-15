import * as React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { checkoutPages } from "./CheckoutPage";

function InformationPage(props) {
  const { checkoutForm, handleChange } = props;
  const history = useHistory();

  const [isDateError, setIsDateError] = React.useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      history.push(checkoutPages.CONFIRMATION_PAGE);
    }
  }

  function validate() {
    const chosenDate = new Date(checkoutForm.delivery);
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);
    if (chosenDate < currentDate) {
      setIsDateError(true);
      return false;
    }
    return true;
  }

  return (
    <Container>
      <h1>Personal contact info</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            required
            value={checkoutForm.email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            placeholder="Enter name"
            onChange={handleChange}
            required
            value={checkoutForm.name}
          />
        </Form.Group>
        <Form.Group controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            placeholder="Enter address"
            onChange={handleChange}
            required
            value={checkoutForm.address}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPhone">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            name="phone"
            placeholder="Enter phone number"
            onChange={handleChange}
            required
            value={checkoutForm.phone}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDelivery">
          <Form.Label>Time of delivery</Form.Label>
          <Form.Control
            type="datetime-local"
            name="delivery"
            onChange={handleChange}
            value={checkoutForm.delivery}
            required
            isInvalid={isDateError}
          />
          <Form.Text className="text-muted">
            We do not support deliveries within an hour.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please select a valid time/date.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex" style={{ justifyContent: "flex-end" }}>
          <Button type="submit" size="lg">
            Go to confirmation
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default InformationPage;
