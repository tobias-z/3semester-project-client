import * as React from "react"
import {Accordion, Card, Col, Container, Nav, Row} from "react-bootstrap"
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
                <Accordion>
                  {restaurantDATA.restaurants.map(restaurant => (
                    <RestaurantLinkAccordion
                      key={restaurant.description}
                      restaurant={restaurant}
                    />
                  ))}
                </Accordion>
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

export function sortRestaurants(menu, menu2) {
  const x = menu.category.toLowerCase()
  const y = menu2.category.toLowerCase()
  if (x < y) {
    return 1
  }
  if (x > y) {
    return -1
  }
  return 0
}

function RestaurantLinkAccordion(props) {
  const {restaurant} = props
  let lastCategory
  return (
    <LinkContainer
      key={restaurant.description}
      to={`/restaurants/${restaurant.name}`}>
      <Card>
        <Accordion.Toggle
          as={Card.Header}
          className="text-primary"
          eventKey={restaurant.name}
          style={{cursor: "pointer"}}>
          {restaurant.name}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={restaurant.name}>
          <Card.Body>
            {restaurant.menus.sort(sortRestaurants).map(menu => {
              if (lastCategory !== menu.category) {
                lastCategory = menu.category
                return <p key={menu.id}>{menu.category}</p>
              }
              return null
            })}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </LinkContainer>
  )
}

export default RestaurantsPage
