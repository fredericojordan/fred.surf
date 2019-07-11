import React from 'react'
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { NavLink } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';

import './styles.css'


const Header = props => (
    <Navbar inverse fixedTop className='navbar'>
        <Navbar.Header>
            <Navbar.Brand>
                <NavLink to="/">Frederico Jordan</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
                <LinkContainer exact to="/">
                    <NavItem eventKey={1}>
                        Home
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/sports">
                    <NavItem eventKey={2}>
                        Sports
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/fast-chess">
                    <NavItem eventKey={3}>
                        Chess AI
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/nbody">
                    <NavItem eventKey={4}>
                        N-Body
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/surf-api">
                    <NavItem eventKey={5}>
                        Surf-API
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/contact">
                    <NavItem eventKey={6}>
                        Contact
                    </NavItem>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);


export default Header