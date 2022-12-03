import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {

    //const {accountID, setAccountID, accountType, setAccountType, accountName, setAccountName} = useContext(UserContext)

    const {testState, setTestState} = useContext(UserContext)
    console.log("State: ",testState)
    testState.accountID = 1
    console.log("State2: ",testState)
    setTestState(testState)
    const navigate = useNavigate()

    useEffect(() => {
        setAccountID(JSON.parse(localStorage.getItem("accountID")))
        setAccountType(localStorage.getItem("accountType"))
        setAccountName(localStorage.getItem("accountName"))
    }, [])

    const handleLogout = () => {
        setAccountID(null)
        setAccountType(null)
        setAccountName(null)
        
        localStorage.setItem('accountID', null)
        localStorage.setItem('accountType', null)
        localStorage.setItem('accountName', null)

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
                        <NavDropdown title= {accountName} id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/home">Log Out</NavDropdown.Item>
                        </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> 
    );
}
 
export default NavBar;