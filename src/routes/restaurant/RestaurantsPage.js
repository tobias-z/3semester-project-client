import * as React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { fetchData } from "../../apiUtils";
import { RESTAURANT } from "../../settings";
import Restaurant from "./Restaurant";

function RestaurantsPage() {
  const [restaurantDATA, setRestaurantDATA] = React.useState();
  let { path } = useRouteMatch();

  React.useEffect(() => {
    fetchData(RESTAURANT.ALL)
      .then((data) => setRestaurantDATA(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Row>
        {restaurantDATA && (
          <>
            <Col md={2}>
              <Nav className="flex-column">
                {restaurantDATA.restaurants.map((restaurant) => (
                  <LinkContainer to={`/restaurants/${restaurant.name}`}>
                    <Nav.Link>{restaurant.name}</Nav.Link>
                  </LinkContainer>
                ))}
              </Nav>
            </Col>
            <Col md={10}>
              <pre>Hello</pre>
              <Switch>
                <Route exact path={path}>
                  <h3>Please select a restaurant.</h3>
                </Route>
                <Route path={`${path}/:name`}>
                  <Restaurant restaurantDATA={restaurantDATA} />
                </Route>
              </Switch>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default RestaurantsPage;
