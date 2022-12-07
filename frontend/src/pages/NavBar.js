import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { UserState } from "../UserState";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {

    const userState = useContext(UserState)
    const accountID = userState.accountID
    const accountName = userState.accountName

    const navigate = useNavigate()

    const handleLogout = () => {
        userState.setAccountID(null)
        userState.setAccountType(null)
        userState.setAccountName(null)
        
        localStorage.setItem('userState', null)

        navigate('/home')
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand as={NavLink} to="/home">DHD</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/bookings">Bookings</Nav.Link>
                    </Nav>

                    <Nav>
                        {!accountID && <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>}
                        {!accountID && <Nav.Link as={NavLink} to="/login">Login</Nav.Link>}

                        {accountID &&
                        <div className="useroptions">
                        <NavDropdown title= {accountName} id="collasible-nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/settings">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                        </div>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> 
    );
}
 
export default NavBar;