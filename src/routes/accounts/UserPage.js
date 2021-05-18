import * as React from "react";
import { Accordion, Card, Container } from "react-bootstrap";
import { fetchData, handleError } from "../../apiUtils";
import CenteredContainer from "../../components/CenteredContainer";
import { INFO, ORDER } from "../../settings";

function UserPage() {
  const [userData, setUserData] = React.useState();
  const [error, setError] = React.useState();
  const [orderData, setOrderData] = React.useState();
  let finalPrice = 0;

  React.useEffect(() => {
    fetchData(ORDER.ALL, "GET").then((data) => setOrderData(data));
  }, []);

  return (
    <Container>
      <h1>Your orders:</h1>
      {orderData && (
        <Card>
          <Accordion>
            {orderData.map((data) => {
              finalPrice = 0;
              return (
                <>
                  <Accordion.Toggle
                    as={Card.Header}
                    className="text-primary"
                    eventKey={data.id}
                    style={{ cursor: "pointer" }}
                  >
                    {data.id} - Delivery: {data.delivery}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={data.id}>
                    <Card.Body>
                      {data.basketDTO.items.map((item) => {
                        finalPrice = finalPrice + item.price * item.amount;

                        return (
                          <Card>
                            <Card.Body>
                              <Card.Title>{item.restaurantName}</Card.Title>

                              <Card.Text>
                                Product: {item.itemName} - Menu number:{" "}
                                {item.dishNumber} - Amount: {item.amount} -
                                Price: {item.price} - €
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        );
                      })}
                      Total Price: {finalPrice} - €
                    </Card.Body>
                  </Accordion.Collapse>
                </>
              );
            })}
          </Accordion>
        </Card>
      )}
    </Container>
  );
}

export default UserPage;
