import * as React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Restaurant from "./Restaurant";

function RestaurantsPage(props) {
  const { restaurants: restaurantDATA } = props;
  let { path } = useRouteMatch();

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
