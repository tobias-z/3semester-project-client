import * as React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Restaurant(props) {
  const { restaurantDATA } = props;
  let { name } = useParams();
  const [restaurant, setRestaurant] = React.useState();
  React.useEffect(() => {
    const tempRestaurant = restaurantDATA.restaurants.find((restaurant) => {
      if (restaurant.name === name) return true;
      return false;
    });
    setRestaurant(tempRestaurant);
  }, [name, restaurantDATA.restaurants]);
  let lastCategory;

  return (
    <div>
      {restaurant && (
        <>
          <div className="text-center">
            <h2>{restaurant.name}</h2>
            <h4>{restaurant.description}</h4>
          </div>
          <Row className="mt-5">
            {restaurant.menus
              .sort((menu, menu2) => {
                const x = menu.category.toLowerCase();
                const y = menu2.category.toLowerCase();
                if (x < y) {
                  return 1;
                }
                if (x > y) {
                  return -1;
                }
                return 0;
              })
              .map((menu) => {
                let isNewCategory = false;
                if (lastCategory !== menu.category) {
                  isNewCategory = true;
                  lastCategory = menu.category;
                }
                return (
                  <Col
                    md={6}
                    className="d-flex justify-content-center"
                    style={{ flexDirection: "column" }}
                  >
                    {isNewCategory && (
                      <div>
                        {" "}
                        <h3>
                          <strong>{menu.category}</strong>
                        </h3>{" "}
                      </div>
                    )}

                    <Card className="my-2" style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Title>{menu.itemName}</Card.Title>
                        <Card.Text>{menu.description}</Card.Text>
                        <Card.Text>{menu.price},- €</Card.Text>
                        <Button variant="secondary">Add to basket</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </>
      )}
    </div>
  );
}

export default Restaurant;
