import * as React from "react";
import { Route, Switch } from "react-router-dom";
import InformationPage from "./InformationPage";

export const checkoutPages = {
  INFO_PAGE: "/checkout",
  PAYMENT_PAGE: "/checkout/payment",
  CONFIRMATION_PAGE: "/checkout/payment/confirmation",
};

function CheckoutPage() {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    delivery: new Date().getHours() + 1 + ":00",
  };
  const [checkoutForm, setCheckoutForm] = React.useState(initialValues);

  function handleChange(event) {
    setCheckoutForm({
      ...checkoutForm,
      [event.target.name]: event.target.value,
    });
  }
  return (
    <Switch>
      <Route exact path={checkoutPages.INFO_PAGE}>
        <InformationPage
          checkoutForm={checkoutForm}
          handleChange={handleChange}
        />
      </Route>
      <Route path={checkoutPages.PAYMENT_PAGE}>
        <p>checkoutForm={JSON.stringify(checkoutForm)}</p>;
      </Route>
      <Route path={checkoutPages.CONFIRMATION_PAGE}>
        <p>Hello from confirmation</p>
      </Route>
    </Switch>
  );
}

export default CheckoutPage;
