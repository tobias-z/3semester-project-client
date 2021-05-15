import * as React from "react";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import * as facade from "./facades/userFacade";
import { fetchData, handleError } from "./apiUtils";
import { RESTAURANT, USER } from "./settings";

function App() {
  const [user, setUser] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState();

  React.useEffect(() => {
    fetchData(RESTAURANT.ALL)
      .then((data) => setRestaurants(data))
      .catch((err) => console.log(err));
  }, []);

  function login(userCredentials, setError, push) {
    facade
      .login(userCredentials)
      .then((user) => {
        push("/");
        setUser({ username: user.username });
      })
      .catch((error) => handleError(error, setError));
  }

  function logout() {
    facade.logout();
    setUser(null);
  }

  React.useEffect(() => {
    fetchData(USER.LOGIN + "/validate-token").then((userLogged) =>
      setUser(userLogged.username)
    );
  }, []);

  // Whenever the user changes the app is rerendered
  return user ? (
    <AuthenticatedApp user={user} logout={logout} restaurants={restaurants} />
  ) : (
    <UnauthenticatedApp login={login} restaurants={restaurants} />
  );
}

export default App;
