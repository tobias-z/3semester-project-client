import * as React from "react";
import { Container, Button, CardColumns, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { checkoutPages } from "./CheckoutPage";

function ConfirmationPage(props) {
  const history = useHistory();
  const { checkoutForm, activeBasket } = props;
  const currentDate = new Date(checkoutForm.delivery);

  function handleAcceptOfOrder() {
    history.push(checkoutPages.PAYMENT_PAGE);
  }

  return (
    <Container>
      {console.log(activeBasket)}
      <h1 className="text-center">Confirm order</h1>
      <div>
        <h3>Contact Information</h3>
        <p>Name: {checkoutForm.name}</p>
        <p>Email: {checkoutForm.email}</p>
        <p>Phone number: {checkoutForm.phone}</p>
        <p>Address: {checkoutForm.address}</p>
      </div>
      <hr />
      <div>
        <h3>Your order</h3>
        <CardColumns>
          {activeBasket &&
            activeBasket.items.map((item) => {
              return (
                <Card>
                  <Card.Body>
                    <Card.Title>
                      Restaurant name: {item.restaurantName}
                    </Card.Title>
                    <Card.Text>Product: {item.itemName}</Card.Text>
                    <Card.Text>Menu number: {item.dishNumber}</Card.Text>
                    <Card.Text>Amount: {item.amount}</Card.Text>
                    <Card.Text>Price: {item.price}</Card.Text>
                    <div className="d-flex">
                      <br />
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
        </CardColumns>
      </div>
      <hr className="my-4" />
      <div>
        <h4>
          Time of delivery: {currentDate.getHours()}:
          {currentDate.getUTCMinutes()} - {currentDate.getDate()}/
          {currentDate.getUTCMonth() + 1}/{currentDate.getFullYear()}
        </h4>
        <Button onClick={handleAcceptOfOrder} block size="lg" variant="success">
          Confirm order
        </Button>
      </div>
    </Container>
  );
}

export default ConfirmationPage;
