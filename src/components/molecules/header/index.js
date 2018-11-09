import React from 'react'
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { Link } from 'react-router-dom';


const Header = props => (
    <Navbar inverse fixedTop>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/">Frederico Jordan</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
                <NavItem eventKey={1} href="#">
                    <Link to="/">
                        Home
                    </Link>
                </NavItem>
                <NavItem eventKey={2} href="#">
                    <Link to="/contact">
                        Contact
                    </Link>
                </NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);


export default Header