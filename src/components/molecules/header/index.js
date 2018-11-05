import React from 'react'
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';


const Header = props => (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Frederico Jordan</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            Projects
          </NavItem>
          <NavItem eventKey={2} href="#">
            Sports
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
);


export default Header