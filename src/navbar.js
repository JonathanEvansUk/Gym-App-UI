import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

class MyNavbar extends React.Component {
  render() {
    return (
      <Navbar light expand="md">
        <NavbarBrand href="/">Gym App</NavbarBrand>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to="/workouts">
              Workouts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/exercises">
              Exercises
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
export default MyNavbar;
