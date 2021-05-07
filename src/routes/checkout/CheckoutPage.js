import * as React from "react";
import { Route, Switch } from "react-router-dom";
import InformationPage from "./InformationPage";
import PaymentPage from "./PaymentPage";

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
    delivery: "",
    creditCardNumber: "",
    expirationDate: "",
    cardName: "",
    securityCode: "",
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
      <Route exact path={checkoutPages.PAYMENT_PAGE}>
        <p>checkoutForm={JSON.stringify(checkoutForm)}</p>;
        <PaymentPage checkoutForm={checkoutForm} handleChange={handleChange} />
      </Route>
      <Route path={checkoutPages.CONFIRMATION_PAGE}>
        <p>Hello from confirmation</p>
      </Route>
    </Switch>
  );
}

export default CheckoutPage;
