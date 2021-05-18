import * as React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function AuthenticatedHeader(props) {
  return (
    <Navbar
      className="mb-4"
      collapseOnSelect
      expand="lg"
      bg="dark"
      sticky="top"
      variant="dark"
    >
      <LinkContainer to="/">
        <Navbar.Brand>JustMix</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/user">
            <Nav.Link>My profile</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/restaurants">
            <Nav.Link>Restaurants</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          <LinkContainer to="/basket/active">
            <Nav.Link>
              <i class="fas fa-shopping-basket">
                <span>
                  :{props.activeBasket && props.activeBasket.items.length}
                </span>
              </i>
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/user">
            <Nav.Link>Signed in as: {localStorage.getItem("user")}</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/">
            <Nav.Link onClick={() => props.logout()}>Log out</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AuthenticatedHeader;
