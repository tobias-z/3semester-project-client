import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UnauthenticatedHeader from "./components/UnauthenticatedHeader";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/accounts/LoginPage";
import MuchDataPage from "./routes/MuchDataPage";
import RestaurantsPage from "./routes/restaurant/RestaurantsPage";
import BasketPage from "./routes/basket/BasketPage";
import CheckoutPage from "./routes/checkout/CheckoutPage";
import ScrollToTop from "./components/ScrollToTop";
import SignupPage from "./routes/accounts/SignupPage";

function UnauthenticatedApp(props) {
  return (
    <Router>
      <UnauthenticatedHeader />
      <ScrollToTop>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage login={props.login} />
          </Route>
          <Route path="/signup">
            <SignupPage />
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
      </ScrollToTop>
    </Router>
  );
}

export default UnauthenticatedApp;
