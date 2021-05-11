import * as React from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { fetchData, handleError } from "../../apiUtils";
import { BASKET } from "../../settings";

function BasketPage() {
  const history = useHistory();
  const [data, setData] = React.useState();
  const [err, setErr] = React.useState();
  function sendToCheckout() {
    history.push("/checkout");
  }
  React.useEffect(() => {
    fetchBasket();
  }, []);
  function fetchBasket() {
    fetchData(BASKET.ACTIVE)
      .then((data) => setData(data))
      .catch((err) => handleError(err, setErr));
  }
  return (
    <Container>
      {data && (
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Restaurant name:</th>
              <th>Dish number:</th>
              <th>Amount:</th>
              <th>Price:</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => {
              return (
                <tr>
                  <td>{item.restaurantName}</td>
                  <td>{item.dishNumber}</td>
                  <td>{item.amount}</td>
                  <td>{item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <div className="d-flex" style={{ justifyContent: "flex-end" }}>
        <Button onClick={sendToCheckout}>Checkout</Button>
      </div>
    </Container>
  );
}

export default BasketPage;
