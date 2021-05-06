import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UnauthenticatedHeader from "./components/UnauthenticatedHeader";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import MuchDataPage from "./routes/MuchDataPage";
import RestaurantsPage from "./routes/restaurant/RestaurantsPage";
import BasketPage from "./routes/BasketPage";
import CheckoutPage from "./routes/checkout/CheckoutPage";

function UnauthenticatedApp(props) {
  return (
    <Router>
      <UnauthenticatedHeader />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage login={props.login} />
        </Route>
        <Route path="/muchdata">
          <MuchDataPage />
        </Route>
        <Route path="/restaurants">
          <RestaurantsPage restaurants={props.restaurants} />
        </Route>
        <Route path="/basket">
          <BasketPage />
        </Route>
        <Route path="/checkout">
          <CheckoutPage />
        </Route>
        <Route path="/">
          <h1>404</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default UnauthenticatedApp;
