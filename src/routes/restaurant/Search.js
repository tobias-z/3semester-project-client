import * as React from "react";
import { Card, Container, Form, Button } from "react-bootstrap";

function Search(props) {
  const { restaurantDATA, loadBasketCount } = props;

  const [filteredRestaurant, setFilteredRestaurant] = React.useState();
  const [search, setSearch] = React.useState("");

  const [itemCount, setItemCount] = React.useState(1);
  const [err, setErr] = React.useState();
  const isCountOne = itemCount === 1;

  const increment = () => setItemCount(itemCount + 1);
  const decriment = () => setItemCount(itemCount - 1);

  //Method #1 currently not working

  React.useEffect(() => {
    let filteredRestaurants = [];
    restaurantDATA.restaurants.forEach((tempRestaurant) => {
      const menuItems = tempRestaurant.menus.filter((menuItem) =>
        menuItem.itemName.toLowerCase().includes(search.toLowerCase())
      );
      const restaurant = {
        name: tempRestaurant.name,
        description: tempRestaurant.description,
        menus: menuItems,
      };
      console.log(menuItems);
      if (menuItems.length > 0) {
        filteredRestaurants = [...filteredRestaurants, restaurant];
      }
    });

    setFilteredRestaurant(filteredRestaurants);
  }, [search, restaurantDATA.restaurants]);

  return (
    <Container>
      <Form.Group>
        <Form.Label>
          <Form.Control
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </Form.Label>
      </Form.Group>
      {console.log(filteredRestaurant)}
      {filteredRestaurant && (
        <div>
          {console.log(filteredRestaurant)}
          <Card>
            <Card.Header>
              <Card.Title>Restaurants</Card.Title>
              <Card.Body>
                {filteredRestaurant.forEach((restaurant) => {
                  return (
                    <Card>
                      {console.log(restaurant)}
                      <Card.Title>{restaurant.name}</Card.Title>
                      <Card.Text>{restaurant.description}</Card.Text>

                      <Card.Body>
                        <Card.Title>{restaurant.menus[0].itemName}</Card.Title>
                        <Card.Text>{restaurant.menus[0].description}</Card.Text>
                        <div className="d-flex">
                          <Button
                            style={{ borderRadius: 0 }}
                            variant="outline-secondary"
                            disabled={isCountOne}
                            onClick={decriment}
                          >
                            -
                          </Button>
                          <Button
                            style={{ borderRadius: 0 }}
                            disabled
                            className="px-3"
                            variant="outline-secondary"
                          >
                            {itemCount}
                          </Button>
                          <Button
                            style={{ borderRadius: 0 }}
                            variant="outline-secondary"
                            onClick={increment}
                          >
                            +
                          </Button>
                          <Button className="ml-3 w-50" variant="secondary">
                            {restaurant.menus[0].price * itemCount}, - €
                          </Button>

                          <br />
                          {err && <h4>{err.message}</h4>}
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </Card.Body>
            </Card.Header>
          </Card>
        </div>
      )}
    </Container>
  );
}

export default Search;
