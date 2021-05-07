import * as React from "react"
import {Col, Container, Nav, Row} from "react-bootstrap"
import {Route, Switch, useRouteMatch} from "react-router-dom"
import {LinkContainer} from "react-router-bootstrap"
import Restaurant from "./Restaurant"

function RestaurantsPage(props) {
  const {restaurants: restaurantDATA} = props
  let {path} = useRouteMatch()

  return (
    <Container>
      <Row>
        {restaurantDATA && (
          <>
            <Col md={2}>
              <Nav
                className="flex-column"
                style={{position: "sticky", top: 80}}>
                {restaurantDATA.restaurants.map(restaurant => (
                  <LinkContainer
                    key={restaurant.description}
                    to={`/restaurants/${restaurant.name}`}>
                    <Nav.Link>{restaurant.name}</Nav.Link>
                  </LinkContainer>
                ))}
              </Nav>
            </Col>
            <Col md={10}>
              <Switch>
                <Route exact path={path}>
                  <h2 className="text-center">Search for a meal</h2>
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
  )
}

export default RestaurantsPage
