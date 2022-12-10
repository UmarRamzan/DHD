import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { accountGetInfo, hospitalGetInfo, removeAccount, removeHospital, updateAccount, hospitalUpdateEntry, getDoctorHospital } from "../API/api";
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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormGroup, Label, Input} from 'reactstrap';
import Spinner from 'react-bootstrap/Spinner';

const HospitalSettings = () => {

    const userState = useContext(UserState)

    const [userData, setUserData] = useState({})
    const [accountData, setAccountData] = useState({})

    const [editing, setEditing] = useState(false)
    const [editingPersonal, setEditingPersonal] = useState(false)
    const [changingPassword, setChangingPassword] = useState(false)
    const [deleting, setDeleting] = useState(false);

    const [newEmail, setNewEmail] = useState('')

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const [emailPending, setEmailPending] = useState(false)
    const [passwordPending, setPasswordPending] = useState(false)
    const [personalPending, setPeronsalPending] = useState(false)
    const [pending, setPending] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {

        const savedState = JSON.parse(localStorage.getItem("userState"))

        if (savedState) {
            setPending(true)
            let hospitalData = hospitalGetInfo(savedState.accountID)
            let accountData = accountGetInfo(savedState.accountID)

            Promise.all([hospitalData, accountData]).then((values)=>{
                setUserData(values[0].data)
                setAccountData(values[1].data)
            }).then(()=>setPending(false))
        }

    }, [])

    useEffect(() => {
        setError('')
    }, [oldPassword, newPassword])

    useEffect(() => {
        setError('')
        setMessage('')
    }, [editing, deleting])

    useEffect(() => {
        setError('')
        setMessage('')

        setName(userData.name)
        setCity(userData.city)
        setAddress(userData.address)
        setNewEmail(accountData.email)

    }, [editing, deleting, editingPersonal])

    const handleEditPersonal = async () => {

        setPeronsalPending(true)

        let res = await hospitalUpdateEntry(userState.accountID, name, city, address)

        if (res.data.isSuccessful) {

            userData['name'] = name
            userData['city'] = city
            userData['address'] = address

            setUserData(userData)

            setName('')
            setCity('')
            setAddress('')

            setMessage("Personal information updated")

        } else {
            setError(res.data.errorMessage)
        }

        setEditingPersonal(false)
        setPeronsalPending(false)
    }

    const handleEditConfirm = async () => {
        setEmailPending(true)
        if (newEmail == '') {
            setError("Enter a new Email")

        } else {
            let res = await updateAccount(accountData.accountID, newEmail, accountData.password)

            if (res.data.isSuccessful) {

                setNewEmail('')

                accountData['email'] = newEmail
                setAccountData(accountData)
                
                setEditing(false)
                setMessage("Email changed")

            } else {
                setError(res.data.errorMessage)
            } 
        }
        setEmailPending(false)
    }

    const handleChangePassword = async () => {
        setPasswordPending(true)

        if (newPassword == '') {
            setError("Enter a new password")
        } else if (sha1(oldPassword) != accountData.password) {
            setError("Old password is incorrect")
        } else {
            let res = await updateAccount(accountData.accountID, accountData.email, sha1(newPassword))

            if (res.data.isSuccessful) {
                accountData.password = sha1(newPassword)

                setOldPassword('')
                setNewPassword('')
                
                setChangingPassword(false)
                setMessage("Password changed")

            } else {
                setError(res.data.errorMessage)
            } 
        }

        setPasswordPending(false)
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
            {pending && <Spinner style={{marginTop: "20%"}} animation="grow" />}
            {!pending &&
                <div>
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
                        
                            {message && <Alert style={{width:"360px", marginTop: "5px"}} variant='success'>{message}</Alert>}
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
                                    <Form.Control style={{ width: '300px'}} type="email" placeholder={accountData.email} value={newEmail} onChange={(e)=>{setNewEmail(e.target.value)}} required/>
                                </Form.Group>

                                <Button onClick={()=>{setEditing(false)}} variant="outline-secondary" type="submit" style={{width: "300px"}}>Cancel</Button>
                                {!emailPending && <Button onClick={handleEditConfirm}variant="outline-success" type="submit" style={{width: "300px"}}>Confirm</Button>}
                                {emailPending && <Button onClick={handleEditConfirm}variant="outline-success" type="submit" style={{width: "300px"}}><Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                /></Button>}

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
                                {!passwordPending && <Button onClick={(handleChangePassword)}variant="outline-success" type="submit" style={{width: "300px"}}>Confirm</Button>}
                                {passwordPending && <Button onClick={(handleChangePassword)}variant="outline-success" type="submit" style={{width: "300px"}}><Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                /></Button>}

                                {error && <Alert style={{width:"300px", marginTop: "5px"}} variant='danger'>{error}</Alert>}

                                </Stack>   
                            </Card.Body>
                    </Card>
                    }   
                </Tab>
                <Tab eventKey="personal" title="Personal">
                    {!editingPersonal && userData && 
                    <Card style={{ width: '650px', margin:"0px 100px", textAlign: "left" }}>
                        <Card.Body>
                            <Card.Title>Personal Information</Card.Title>
                            <Card.Text>{"Name: " + userData.name}</Card.Text>
                            <Card.Text>{"City: " + userData.city}</Card.Text>
                            <Card.Text>{"Address: " + userData.address}</Card.Text>
                            
                            <Button variant="outline-success" onClick={()=>{setEditingPersonal(true)}}>Edit</Button>
                        </Card.Body>
                    </Card>
                    }

                    {editingPersonal && 
                        <Card style={{ width: '650px', margin:"0px 100px", textAlign: "left" }}>
                        <Card.Body>
                        <Card.Title>Edit Personal Information</Card.Title>
                        <Form style={{textAlign:"left", width: "380px"}}>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control placeholder={userData.name} value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>City</Form.Label>
                                <Form.Control placeholder={userData.city} value={city} onChange={(e)=>{setCity(e.target.value)}} required/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder={userData.address} value={address} onChange={(e)=>{setAddress(e.target.value)}} required/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3" style={{marginLeft: "0px"}}>
                            <Button onClick={()=>{setEditingPersonal(false)}} variant="outline-secondary" style={{width: "380px", margin: "5px 0px"}}>Cancel</Button>
                            {!personalPending && <Button onClick={handleEditPersonal} variant="outline-success" type="submit" style={{width: "380px"}}>Confirm</Button>}
                            {personalPending && <Button onClick={handleEditPersonal} variant="outline-success" type="submit" style={{width: "380px"}}><Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            /></Button>}
                        </Row>

                    </Form>
                    {error && <Alert variant='danger'>{error}</Alert>}
                        </Card.Body>
                    </Card>
                    }
                </Tab>
            </Tabs>
            </div>
            }
        </div>
     );
}
 
export default HospitalSettings