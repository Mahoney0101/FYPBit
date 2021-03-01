import React, { Component } from 'react';
import {  Container, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap';

export class NavMenu extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
        <div>
        <Navbar id="topNavBar" className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow navColour" light>
              <Container>
                  <NavbarBrand>V.0 FYP</NavbarBrand>
                      <ul className="navbar-nav flex-grow">
                          <NavItem className="displayNone">
                              <NavLink tag={Link} className="text-dark" to="/">Dashboard</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink tag={Link} className="text-dark" to="/form">Edit Account Details</NavLink>
                          </NavItem>
                      </ul>
              </Container>
          </Navbar>
      </div>
    );
  }
}