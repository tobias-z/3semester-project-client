import * as React from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { fetchData, handleError } from "../../apiUtils";
import { BASKET } from "../../settings";

function Search(props) {
  const { restaurantDATA, loadBasketCount } = props;

  const [filteredRestaurant, setFilteredRestaurant] = React.useState();
  const [search, setSearch] = React.useState("");

  const [err, setErr] = React.useState();

  React.useEffect(() => {
    let filteredRestaurants = [];
    restaurantDATA.restaurants.forEach((tempRestaurant) => {
      const menuItems = tempRestaurant.menus.filter(
        (menuItem) =>
          menuItem.itemName.toLowerCase().includes(search.toLowerCase()) ||
          menuItem.description.toLowerCase().includes(search.toLowerCase()) ||
          menuItem.category.toLowerCase().includes(search.toLowerCase())
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
  }, [search]);

  return (
    <div>
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

        {filteredRestaurant && (
          <div>
            {console.log(filteredRestaurant)}
            <Card>
              <Card.Header>
                <Card.Title>Restaurants</Card.Title>
                <Card.Body>
                  {filteredRestaurant.map((restaurant) => {
                    return (
                      <MenuItem
                        restaurant={restaurant}
                        err={err}
                        setErr={setErr}
                        loadBasketCount={loadBasketCount}
                      />
                    );
                  })}
                </Card.Body>
              </Card.Header>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
}

function MenuItem(props) {
  const { restaurant, err, setErr, loadBasketCount } = props;

  function handleInputBasket(restaurant, menu, itemCount) {
    const chosenItem = {
      itemName: "",
      restaurantName: "",
      dishNumber: "",
      amount: "",
      price: "",
    };
    chosenItem.itemName = menu.itemName;
    chosenItem.dishNumber = menu.id;
    chosenItem.restaurantName = restaurant.name;
    chosenItem.amount = itemCount;
    chosenItem.price = menu.price;

    fetchData(BASKET.ADD, "POST", chosenItem)
      .then(() => loadBasketCount())
      .catch((err) => handleError(err, setErr));
    console.log(chosenItem);
  }

  return (
    <Card>
      {console.log(restaurant)}
      <Card.Title>{restaurant.name}</Card.Title>
      <Card.Text>{restaurant.description}</Card.Text>
      {restaurant.menus.map((menu) => {
        return (
          <Item
            menu={menu}
            restaurant={restaurant}
            handleInputBasket={handleInputBasket}
            err={err}
          />
        );
      })}
    </Card>
  );
}

function Item(props) {
  const { menu, restaurant, handleInputBasket, err } = props;
  const [itemCount, setItemCount] = React.useState(1);
  const isCountOne = itemCount === 1;

  const increment = () => setItemCount(itemCount + 1);
  const decriment = () => setItemCount(itemCount - 1);
  return (
    <Card.Body>
      <Card.Title>{menu.itemName}</Card.Title>
      <Card.Text>{menu.description}</Card.Text>
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
        <Button
          className="ml-3 w-50"
          variant="secondary"
          onClick={() => handleInputBasket(restaurant, menu, itemCount)}
        >
          {menu.price * itemCount}, - €
        </Button>

        <br />
        {err && <h4>{err.message}</h4>}
      </div>
    </Card.Body>
  );
}

export default Search;
