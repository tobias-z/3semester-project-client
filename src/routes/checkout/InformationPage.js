import * as React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { checkoutPages } from "./CheckoutPage";

function InformationPage(props) {
  const { checkoutForm, handleChange } = props;
  const [dateArray, setDateArray] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    const updatedDate = new Array(14).fill(new Date()).map((date, index) => {
      let dateToReturn = date.getHours() + 1 + index;
      if (dateToReturn >= 25) {
        dateToReturn = 0 + index;
      }
      return dateToReturn;
    });
    setDateArray(updatedDate);
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    history.push(checkoutPages.PAYMENT_PAGE);
  }

  return (
    <Container>
      <h1>Enter personal contact info</h1>
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
          />
        </Form.Group>
        <div className="d-flex" style={{ justifyContent: "flex-end" }}>
          <Button type="submit">Go to payment</Button>
        </div>
      </Form>
    </Container>
  );
}

export default InformationPage;
