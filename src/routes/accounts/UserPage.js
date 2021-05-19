import * as React from "react";
import { Accordion, Card, Container } from "react-bootstrap";
import { fetchData } from "../../apiUtils";
import { ORDER, POINT } from "../../settings";

function UserPage() {
  const [orderData, setOrderData] = React.useState();
  const [pointData, setPointData] = React.useState();

  React.useEffect(() => {
    fetchData(ORDER.ALL, "GET").then((data) => {
      setOrderData(data);
    });
    fetchData(POINT.ALL + localStorage.getItem("user"), "GET").then((data) => {
      setPointData(data);
    });
  }, []);

  return (
    <Container>
      <h1>Your orders:</h1>
      {orderData && pointData && (
        <>
          <Card>
            <Accordion>
              {orderData.map((data) => {
                return (
                  <>
                    <Accordion.Toggle
                      as={Card.Header}
                      className="text-primary"
                      eventKey={data.id}
                      style={{ cursor: "pointer" }}
                    >
                      {data.id} - Delivery: {data.delivery} - Name: {data.name}{" "}
                      - Phone: {data.phone} - Email: {data.email} - Bonus
                      points:{" "}
                      {Math.round(data.generatedBonusPoints * 100) / 100}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={data.id}>
                      <Card.Body>
                        {data.basketDTO.items.map((item) => {
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
                        Total Price: {data.basketDTO.totalPrice} - €
                      </Card.Body>
                    </Accordion.Collapse>
                  </>
                );
              })}
            </Accordion>
          </Card>
          <p>Loyalty Bonus Points: {pointData.bonusPoints}</p>
        </>
      )}
    </Container>
  );
}

export default UserPage;
