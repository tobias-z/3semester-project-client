import * as React from "react";
import { Button, Card, Toast } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchData, handleError } from "../../apiUtils";
import { sortRestaurants } from "./RestaurantsPage";
import { BASKET } from "../../settings";

function Restaurant(props) {
  const { restaurantDATA, loadBasketCount } = props;
  let { name } = useParams();

  const [restaurant, setRestaurant] = React.useState();
  const [show, setShow] = React.useState(false);
  const [chosenMenu, setChosenMenu] = React.useState({
    menu: "",
    itemCount: "",
  });

  const toggleShow = () => setShow(true);

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
      <NotificationPopUp
        show={show}
        menu={chosenMenu.menu}
        itemCount={chosenMenu.itemCount}
        setShow={setShow}
      />
      {restaurant && (
        <>
          <div className="text-center">
            <h2>{restaurant.name}</h2>
            <h4>{restaurant.description}</h4>
          </div>
          <div className="mt-5">
            {restaurant.menus.sort(sortRestaurants).map((menu) => {
              let isNewCategory = false;
              if (lastCategory !== menu.category) {
                isNewCategory = true;
                lastCategory = menu.category;
              }
              return (
                <MenuItem
                  key={menu.id}
                  menu={menu}
                  isNewCategory={isNewCategory}
                  setChosenMenu={setChosenMenu}
                  toggleShow={toggleShow}
                  restaurant={restaurant}
                  loadBasketCount={loadBasketCount}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function MenuItem(props) {
  const {
    isNewCategory,
    menu,
    setChosenMenu,
    toggleShow,
    restaurant,
    loadBasketCount,
  } = props;
  const [itemCount, setItemCount] = React.useState(1);
  const [err, setErr] = React.useState();
  const isCountOne = itemCount === 1;

  const increment = () => setItemCount(itemCount + 1);
  const decriment = () => setItemCount(itemCount - 1);

  function handleInputBasket(restaurant) {
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
      .then(() => setChosenMenu({ menu, itemCount }), toggleShow())
      .then(() => loadBasketCount())
      .catch((err) => handleError(err, setErr));
    console.log(chosenItem);
  }

  function generateCardBody() {
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
            onClick={() => handleInputBasket(restaurant)}
          >
            {menu.price * itemCount}, - €
          </Button>

          <br />
          {err && <h4>{err.message}</h4>}
        </div>
      </Card.Body>
    );
  }

  if (isNewCategory) {
    return (
      <>
        <div className="bg-light py-2">
          {" "}
          <h3 className="pl-3 mt-1" id={menu.category}>
            <strong>{menu.category}</strong>
          </h3>{" "}
        </div>
        <Card className="my-2">{generateCardBody()}</Card>
      </>
    );
  } else {
    return <Card className="my-2">{generateCardBody()}</Card>;
  }
}

function NotificationPopUp(props) {
  const { show, menu, itemCount, setShow } = props;

  return (
    <Toast show={show} onClose={() => setShow(false)} className="popup">
      <Toast.Header>
        <strong className="mr-auto">Product: {menu.itemName} </strong>
        <small>Just now!</small>
      </Toast.Header>

      <Toast.Body>
        Amount: {itemCount} - Price: {menu.price * itemCount}
      </Toast.Body>
    </Toast>
  );
}

export default Restaurant;
