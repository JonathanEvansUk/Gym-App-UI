import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

class MyNavbar extends React.Component {
  render() {
    return (
      <Navbar light expand="md">
        <NavbarBrand href="/">Gym App</NavbarBrand>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/components/">Components</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/componenst">Github</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
export default MyNavbar;
