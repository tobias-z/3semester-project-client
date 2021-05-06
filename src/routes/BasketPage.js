import * as React from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function BasketPage() {
  const history = useHistory();
  function sendToCheckout() {
    history.push("/checkout");
  }

  return (
    <Container>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tuborg classic</td>
            <td>5</td>
            <td>140</td>
          </tr>
          <tr>
            <td>Pizza large</td>
            <td>2</td>
            <td>55</td>
          </tr>
          <tr>
            <td>Greek salat</td>
            <td>2</td>
            <td>10</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex" style={{ justifyContent: "flex-end" }}>
        <Button onClick={sendToCheckout}>Checkout</Button>
      </div>
    </Container>
  );
}

export default BasketPage;
