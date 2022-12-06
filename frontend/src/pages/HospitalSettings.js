import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { accountGetInfo, hospitalGetInfo, removeAccount, removeHospital } from "../API/api";
import { UserState } from "../UserState";
import sha1 from 'sha1';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

const HospitalSettings = () => {

    const userState = useContext(UserState)

    const [userData, setUserData] = useState({})
    const [accountData, setAccountData] = useState({})

    const [editing, setEditing] = useState(false)
    const [changingPassword, setChangingPassword] = useState(false)
    const [deleting, setDeleting] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [accountType, setAccountType] = useState('patient')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {

        const savedState = JSON.parse(localStorage.getItem("userState"))

        if (savedState) {
            let hospitalData = hospitalGetInfo(savedState.accountID)
            let accountData = accountGetInfo(savedState.accountID)

            hospitalData.then((res) => {setUserData(res.data)})
            accountData.then((res) => {setAccountData(res.data)})
        }

    }, [])

    useEffect(() => {
        setError('')
    }, [oldPassword, newPassword])

    const handleEditConfirm = () => {
        setEditing(false)
    }

    const handleChangePassword = () => {
        if (sha1(oldPassword) != accountData.password) {
            setError("Old password is incorrect")
        } else {
            setEditing(false)
        }
    }

    const handleDelete = async () => {

        setDeleting(false)

        await removeAccount(accountData.accountID)
        await removeHospital(accountData.accountID)

        userState.setAccountID(null)
        userState.setAccountType(null)
        userState.setAccountName(null)

        userState["accountID"] = null
        userState["accountName"] = null
        userState["accountType"] = null
        
        localStorage.setItem('userState', null)

        navigate('/home')
    }

    return ( 
        <div className="settings">
            <Modal show={deleting} onHide={()=>{setDeleting(false)}}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you wish to delete this account</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setDeleting(false)}}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
            
            <Tabs defaultActiveKey="account" className="mb-3" variant="tabs" style={{margin:"15px 100px"}}>
                <Tab eventKey="account" title="Account">
                    {!editing && !changingPassword &&
                    <Card style={{ width: '650px', margin:"0px 100px", textAlign: "left" }}>
                        <Card.Body>
                            <Card.Title>Account Information</Card.Title>
                            <Card.Text>{"Email: " + accountData.email}</Card.Text>
                            <Card.Text>{"Account Type: " + accountData.accountType}</Card.Text>
                            
                            <Button variant="outline-secondary" onClick={()=>{setEditing(true)}} style={{margin:"5px"}}>Edit</Button>
                            <Button variant="outline-secondary" onClick={()=>{setChangingPassword(true)}} style={{margin:"5px"}}>Change Password</Button>
                            <Button variant="outline-danger" onClick={()=>{setDeleting(true)}} style={{margin:"5px"}}>Delete Account</Button>
                        </Card.Body>
                    </Card>
                    }
                    {editing &&
                        <Card style={{ width: '650px', margin:"0px 100px", textAlign: "left" }}>
                            <Card.Body>
                                <Card.Title>Edit Account Information</Card.Title>
                                <Stack gap={1} className="col-12 mx-auto">
                            
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control style={{ width: '300px'}} type="email" placeholder={accountData.email} value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                                </Form.Group>

                                <Button onClick={()=>{setEditing(false)}} variant="outline-secondary" type="submit" style={{width: "300px"}}>Cancel</Button>
                                <Button onClick={handleEditConfirm}variant="outline-success" type="submit" style={{width: "300px"}}>Confirm</Button>

                                {error && <Alert variant='danger'>{error}</Alert>}

                                </Stack>   
                            </Card.Body>
                        </Card>
                    }

                    {changingPassword &&
                    <Card style={{ width: '650px', margin:"0px 100px", textAlign: "left" }}>
                            <Card.Body>
                                <Card.Title>Change Password</Card.Title>
                                <Stack gap={1} className="col-12 mx-auto">
                            
                                <Form.Group className="mb-3">
                                    <Form.Control style={{ width: '300px', margin: '10px 0px'}} type="password" placeholder="Old Password" value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}} required/>
                                    <Form.Control style={{ width: '300px', margin: '10px 0px'}} type="password" placeholder="New Password" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} required/>
                                </Form.Group>

                                <Button onClick={()=>{setChangingPassword(false)}} variant="outline-secondary" type="submit" style={{width: "300px"}}>Cancel</Button>
                                <Button onClick={(handleChangePassword)}variant="outline-success" type="submit" style={{width: "300px"}}>Confirm</Button>

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
                            <Card.Text>{"Name: " + userData.name}</Card.Text>
                            <Card.Text>{"City: " + userData.city}</Card.Text>
                            {userData.dateOfBirth && <Card.Text>{"Date of Birth: " + userData.dateOfBirth.substring(0,10)}</Card.Text>}
                            <Card.Text>{"Address: " + userData.address}</Card.Text>
                            
                            <Button variant="outline-success" onClick={()=>{setEditing(true)}}>Edit</Button>
                        </Card.Body>
                    </Card>
                    }
                </Tab>
            </Tabs>
        </div>
     );
}
 
export default HospitalSettings