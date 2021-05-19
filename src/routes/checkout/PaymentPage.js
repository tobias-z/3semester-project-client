import * as React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import CenteredContainer from "../../components/CenteredContainer";
import { fetchData } from "../../apiUtils";
import { ORDER, POINT } from "../../settings";
import { useHistory } from "react-router";

function PaymentPage(props) {
  const { checkoutForm, handleChange, resetActiveBasket } = props;

  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState();
  const [pointData, setPointData] = React.useState();

  const history = useHistory();

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
    isUsingBonusPoints: checked,
    contactInfo: contactInfo,
    creditCardInfo: creditCardInfo,
  };

  React.useEffect(() => {
    fetchData(POINT.ALL + localStorage.getItem("user"), "GET").then((data) => {
      setPointData(data);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    fetchData(ORDER.CREATE, "POST", orderInfo).then(() => {
      resetActiveBasket();
      setLoading(false);
      history.push("/user");
    });
  }
  return (
    <CenteredContainer>
      {loading ? <Spinner animation="border" /> : ""}
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
        {pointData && (
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label={`Use loyalty points: ${pointData.bonusPoints}`}
              onChange={() => setChecked(!checked)}
            />
          </Form.Group>
        )}
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
