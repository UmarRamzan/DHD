import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { accountGetInfo, doctorGetInfo, removeAccount, removeDoctor } from "../API/api";
import { UserState } from "../UserState";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const DoctorSettings = () => {

    const userState = useContext(UserState)

    const [userData, setUserData] = useState({})
    const [accountData, setAccountData] = useState({})
    const [editing, setEditing] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accountType, setAccountType] = useState('patient')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {

        let doctorData = doctorGetInfo(userState.accountID)
        let accountData = accountGetInfo(userState.accountID)

        doctorData.then((res) => {setUserData(res.data)})
        accountData.then((res) => {setAccountData(res.data)})

    }, [])

    const handleEdit = () => {
        setEditing(true)
    }

    const handleChangePassword = () => {

    }

    const handleDelete = async () => {

        await removeAccount(accountData.accountID)
        await removeDoctor(accountData.accountID)

        userState.setAccountID(null)
        userState.setAccountType(null)
        userState.setAccountName(null)
        
        localStorage.setItem('userState', null)

        navigate('/home')
    }

    return ( 
        <div className="settings">
            
            <Tabs defaultActiveKey="account" className="mb-3" variant="tabs" style={{margin:"15px 100px"}}>
                <Tab eventKey="account" title="Account">
                    {!editing &&
                    <Card style={{ width: '650px', margin:"0px 100px", textAlign: "left" }}>
                        <Card.Body>
                            <Card.Title>Account Information</Card.Title>
                            <Card.Text>{"Email: " + accountData.email}</Card.Text>
                            <Card.Text>{"Account Type: " + accountData.accountType}</Card.Text>
                            
                            <Button variant="outline-secondary" onClick={handleEdit} style={{margin:"5px"}}>Edit</Button>
                            <Button variant="outline-secondary" onClick={handleChangePassword} style={{margin:"5px"}}>Change Password</Button>
                            <Button variant="outline-danger" onClick={handleDelete} style={{margin:"5px"}}>Delete Account</Button>
                        </Card.Body>
                    </Card>
                    }
                    {editing &&
                        <Card style={{ width: '650px', margin:"0px 100px", textAlign: "left" }}>
                            <Card.Body>
                                <Card.Title>Account Information</Card.Title>
                                <Stack gap={1} className="col-12 mx-auto">
                            
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control style={{ width: '300px'}} type="email" placeholder={accountData.email} value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                                </Form.Group>

                                <Button onClick={()=>{setEditing(false)}} variant="outline-secondary" type="submit" style={{width: "300px"}}>Cancel</Button>
                                <Button variant="outline-success" type="submit" style={{width: "300px"}}>Confirm</Button>

                                {error && <Alert variant='danger'>{error}</Alert>}

                                </Stack>   
                            </Card.Body>
                        </Card>
                        
                    }
                </Tab>
                <Tab eventKey="personal" title="Personal">
                    {!editing && userData && 
                    <Card style={{ width: '650px', margin:"0px 100px", textAlign: "left" }}>
                        <Card.Body>
                            <Card.Title>Personal Information</Card.Title>
                            <Card.Text>{"First Name: " + userData.firstName}</Card.Text>
                            <Card.Text>{"Last Name: " + userData.lastName}</Card.Text>
                            {userData.dateOfBirth && <Card.Text>{"Date of Birth: " + userData.dateOfBirth.substring(0,10)}</Card.Text>}
                            <Card.Text>{"Gender: " + userData.gender}</Card.Text>
                            
                            <Button variant="outline-success" onClick={handleEdit}>Edit</Button>
                        </Card.Body>
                    </Card>
                    }
                </Tab>
            </Tabs>
        </div>
     );
}
 
export default DoctorSettings