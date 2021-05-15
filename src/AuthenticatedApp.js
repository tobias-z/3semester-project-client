import * as React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { fetchData } from "./apiUtils";
import AuthenticatedHeader from "./components/AuthenticatedHeader";
import AdminPage from "./routes/accounts/AdminPage";
import BasketPage from "./routes/basket/BasketPage";
import HomePage from "./routes/HomePage";
import MuchDataPage from "./routes/MuchDataPage";
import RestaurantsPage from "./routes/restaurant/RestaurantsPage";
import UserPage from "./routes/accounts/UserPage";
import { BASKET } from "./settings";
import CheckoutPage from "./routes/checkout/CheckoutPage";

function AuthenticatedApp(props) {
  const { logout, user } = props;
  const [activeBasket, setActiveBasket] = React.useState();

  function loadBasketCount() {
    fetchData(BASKET.ACTIVE).then((data) => setActiveBasket(data));
  }
  function resetActiveBasket() {
    setActiveBasket(null);
  }
  React.useEffect(() => {
    loadBasketCount();
  }, []);
  return (
    <Router>
      <AuthenticatedHeader
        logout={logout}
        user={user}
        restaurants={props.restaurants}
        activeBasket={activeBasket}
      />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/muchdata">
          <MuchDataPage />
        </Route>
        <Route path="/user">
          <UserPage />
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
        <Route path="/basket/active">
          <BasketPage loadBasketCount={loadBasketCount} />
        </Route>
        <Route path="/checkout">
          <CheckoutPage
            activeBasket={activeBasket}
            loadBasketCount={loadBasketCount}
            resetActiveBasket={resetActiveBasket}
          />
        </Route>
        <Route path="/restaurants">
          <RestaurantsPage
            restaurants={props.restaurants}
            user={user}
            activeBasket={activeBasket}
            loadBasketCount={loadBasketCount}
          />
        </Route>
        <Route path="/">
          <h1>404</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default AuthenticatedApp;
