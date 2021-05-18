import * as React from "react";
import { Route, Switch } from "react-router-dom";
import ConfirmationPage from "./ConfirmationPage";
import InformationPage from "./InformationPage";
import PaymentPage from "./PaymentPage";

export const checkoutPages = {
  INFO_PAGE: "/checkout",
  PAYMENT_PAGE: "/checkout/confirmation/payment",
  CONFIRMATION_PAGE: "/checkout/confirmation",
};

function CheckoutPage(props) {
  const { activeBasket, resetActiveBasket } = props;
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
      <Route exact path={checkoutPages.CONFIRMATION_PAGE}>
        <ConfirmationPage
          checkoutForm={checkoutForm}
          activeBasket={activeBasket}
        />
      </Route>
      <Route path={checkoutPages.PAYMENT_PAGE}>
        <PaymentPage
          checkoutForm={checkoutForm}
          handleChange={handleChange}
          resetActiveBasket={resetActiveBasket}
        />
      </Route>
    </Switch>
  );
}

export default CheckoutPage;
