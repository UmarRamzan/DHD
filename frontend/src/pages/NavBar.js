import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
                <Navbar.Brand href="/home">DHD</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/bookings">Bookings</Nav.Link>
                    </Nav>

                    <Nav>
                        {!accountID && <Nav.Link href="/signup">Sign Up</Nav.Link>}
                        {!accountID && <Nav.Link href="/login">Login</Nav.Link>}

                        {accountID &&
                        <div className="useroptions">
                        <NavDropdown title= {accountName} id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/home" onClick={handleLogout}>Log Out</NavDropdown.Item>
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