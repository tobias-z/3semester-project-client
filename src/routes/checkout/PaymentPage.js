import * as React from "react";
import { Form, Button } from "react-bootstrap";
import CenteredContainer from "../../components/CenteredContainer";
import { fetchData } from "../../apiUtils";
import { ORDER } from "../../settings";

function PaymentPage(props) {
  const { checkoutForm, handleChange, resetActiveBasket } = props;

  const contactInfo = {
    name: checkoutForm.name,
    email: checkoutForm.email,
    phone: checkoutForm.phone,
    address: checkoutForm.address,
    delivery: checkoutForm.delivery,
  };
  const creditCardInfo = {
    creditCardNumber: checkoutForm.creditCardInfo,
    expirationDate: checkoutForm.expirationDate,
    cardName: checkoutForm.cardName,
    securityCode: checkoutForm.securityCode,
  };

  const orderInfo = {
    contactInfo: contactInfo,
    creditCardInfo: creditCardInfo,
  };

  function handleSubmit(e) {
    e.preventDefault();
    fetchData(ORDER.CREATE, "POST", orderInfo).then(() => resetActiveBasket());
  }
  return (
    <CenteredContainer>
      <h1>Payment Details</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicCreditCardNumber">
          <Form.Label>Credit card number</Form.Label>
          <Form.Control
            name="creditCardNumber"
            type="text"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            onChange={handleChange}
            required
            value={checkoutForm.creditCardNumber}
            size="lg"
          />
          <Form.Text className="text-muted">
            We'll never share your card information with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicExpirationDate">
          <Form.Label>Card expiration date</Form.Label>
          <Form.Control
            name="expirationDate"
            type="text"
            placeholder="MM/YY"
            onChange={handleChange}
            required
            value={checkoutForm.expirationDate}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCardName">
          <Form.Label>Card holder's name</Form.Label>
          <Form.Control
            name="cardName"
            type="text"
            onChange={handleChange}
            required
            value={checkoutForm.cardName}
          />
        </Form.Group>
        <Form.Group controlId="formBasicSecurityCode">
          <Form.Label>Card security pin</Form.Label>
          <Form.Control
            name="securityCode"
            type="text"
            placeholder="Enter card security code"
            onChange={handleChange}
            required
            value={checkoutForm.securityCode}
          />
        </Form.Group>
        <div className="d-flex" style={{ justifyContent: "flex-end" }}>
          <Button block type="submit" size="lg">
            Confirm payment
          </Button>
        </div>
      </Form>
    </CenteredContainer>
  );
}

export default PaymentPage;
