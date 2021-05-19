import * as React from "react";
import { Button, Container, Card, CardColumns } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { fetchData, handleError } from "../../apiUtils";
import { BASKET } from "../../settings";

function BasketPage(props) {
  const { loadBasketCount } = props;
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

  function handleButton(action, id) {
    const jsonAction = {
      type: "",
    };
    jsonAction.type = action;
    fetchData(BASKET.EDIT + "/" + id, "PUT", jsonAction)
      .then(() => fetchBasket())
      .then(() => loadBasketCount());
  }

  return (
    <Container>
      <h3>Welcome to your Basket:</h3>
      <div class="counter"></div>
      <CardColumns>
        {data &&
          data.items.map((item) => {
            return (
              <Card>
                <Card.Body>
                  <Card.Title>
                    Restaurant name: {item.restaurantName}
                  </Card.Title>
                  <Card.Text>Dish number: {item.dishNumber}</Card.Text>
                  <Card.Text>Product name: {item.itemName}</Card.Text>
                  <div className="d-flex">
                    <Button
                      style={{ borderRadius: 0 }}
                      variant="outline-secondary"
                      disabled={item.amount === 1}
                      onClick={() => handleButton("DECREMENT", item.id)}
                    >
                      -
                    </Button>
                    <Button
                      style={{ borderRadius: 0 }}
                      disabled
                      className="px-3"
                      variant="outline-secondary"
                    >
                      {item.amount}
                    </Button>
                    <Button
                      style={{ borderRadius: 0 }}
                      variant="outline-secondary"
                      onClick={() => handleButton("INCREMENT", item.id)}
                    >
                      +
                    </Button>
                    <Button className="mr-4" variant="secondary" disabled>
                      {item.price * item.amount} - €
                    </Button>
                    <Button
                      className="mr"
                      variant="danger"
                      onClick={() => handleButton("DELETE", item.id)}
                      style={{ justifyContent: "flex-end" }}
                    >
                      X
                    </Button>

                    <br />
                    {err && <h4>{err.message}</h4>}
                  </div>
                </Card.Body>
              </Card>
            );
          })}
      </CardColumns>
      {data && (
        <div className="d-flex" style={{ justifyContent: "flex-end" }}>
          <Button disabled variant="outline-secondary">
            Total price: {data.totalPrice}
          </Button>
          <Button onClick={sendToCheckout}>Checkout</Button>
        </div>
      )}
    </Container>
  );
}

export default BasketPage;
