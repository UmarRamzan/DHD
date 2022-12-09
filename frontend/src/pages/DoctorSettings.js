import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { accountGetInfo, doctorGetInfo, removeAccount, removeDoctor, updateAccount, doctorUpdateEntry, doctorHospitalAddEntry } from "../API/api";
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
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import CloseButton from 'react-bootstrap/CloseButton';

const HospitalSettings = () => {

    const userState = useContext(UserState)

    const [userData, setUserData] = useState({})
    const [accountData, setAccountData] = useState({})

    const [editing, setEditing] = useState(false)
    const [editingPersonal, setEditingPersonal] = useState(false)
    const [changingPassword, setChangingPassword] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [addingHospital, setAddingHospital] = useState(false)
    const [deletingHospital, setDeletingHospital] = useState(false)

    const [newEmail, setNewEmail] = useState('')

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState('male')
    const [specialization, setSpecialization] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [personalBio, setPersonalBio] = useState('')
    const [onlineAvailability, setOnlineAvailability] = useState(false)
    const [hourlyCharge, setHourlyCharge] = useState('')

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    useEffect(() => {

        const savedState = JSON.parse(localStorage.getItem("userState"))

        if (savedState) {
            let doctorData = doctorGetInfo(savedState.accountID)
            let accountData = accountGetInfo(savedState.accountID)

            doctorData.then((res) => {setUserData(res.data)})
            accountData.then((res) => {setAccountData(res.data)})
        }

    }, [])

    useEffect(() => {
        setError('')
    }, [oldPassword, newPassword])

    useEffect(() => {
        setError('')
        setMessage('')

        setFirstName(userData.firstName)
        setLastName(userData.lastName)
        if (userData.dateOfBirth) {setDateOfBirth(userData.dateOfBirth.substring(0,10))}
        setGender(userData.gender)
        setSpecialization(userData.specialization)
        setCity(userData.city)
        setAddress(userData.address)
        setStartTime(userData.startTime)
        setEndTime(userData.endTime)
        setPersonalBio(userData.personalBio)
        setHourlyCharge(userData.hourlyCharges)
        setOnlineAvailability(userData.onlineAvailability)

    }, [editing, deleting, editingPersonal])

    
    const handleEditPersonal = async () => {

        let online = onlineAvailability? 1 : 0
        console.log(userState)

        let res = await doctorUpdateEntry(userState.accountID, firstName, lastName, dateOfBirth, gender, specialization, city, address, startTime, endTime, personalBio, online, hourlyCharge)

        if (res.data.isSuccessful) {
            setEditingPersonal(false)

        } else {
            setError(res.data.errorMessage)
        } 
        console.log(res)
    }

    const handleEditConfirm = async () => {
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
    }

    const handleChangePassword = async () => {
        if (newPassword == '') {
            setError("Enter a new password")
        } else if (sha1(oldPassword) != accountData.password) {
            setError("Old password is incorrect")
        } else {
            let res = await updateAccount(accountData.accountID, accountData.email, sha1(newPassword))

            if (res.data.isSuccessful) {

                setOldPassword('')
                setNewPassword('')
                
                setChangingPassword(false)
                setMessage("Password changed")

            } else {
                setError(res.data.errorMessage)
            } 
        }
    }

    const handleDelete = async () => {

        setDeleting(false)

        await removeAccount(accountData.accountID)
        await removeDoctor(accountData.accountID)

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
                            <Card.Text>{"First Name: " + userData.firstName}</Card.Text>
                            <Card.Text>{"Last Name: " + userData.lastName}</Card.Text>
                            {dateOfBirth && <Card.Text>{"Date of Birth: " + userData.dateOfBirth.substring(0,10)}</Card.Text>}
                            <Card.Text>{"Gender: " + userData.gender}</Card.Text>
                            <Card.Text>{"Specialization: " + userData.specialization}</Card.Text>
                            <Card.Text>{"City: " + userData.city}</Card.Text>
                            <Card.Text>{"Address: " + userData.address}</Card.Text>
                            <Card.Text>{"Start Time: " + userData.startTime}</Card.Text>
                            <Card.Text>{"End Time: " + userData.endTime}</Card.Text>
                            <Card.Text>{"Personal Bio: " + userData.personalBio}</Card.Text>
                            <Card.Text>{"Hourly Charges: " + userData.hourlyCharges}</Card.Text>
                            <Card.Text>{`Online Availability: ${userData.onlineAvailability ? "Avialable" : "Not Available"}`}</Card.Text>
                            
                            
                            <Button variant="outline-success" onClick={()=>{setEditingPersonal(true)}}>Edit</Button>
                        </Card.Body>
                    </Card>
                    }

                    {editingPersonal && 
                        <Card style={{ width: '650px', margin:"0px 100px", textAlign: "left" }}>
                        <Card.Body>
                        <Card.Title>Edit Personal Information</Card.Title>
                        <Form style={{textAlign:"left", width: "380px"}}>

                        <Form onSubmit={handleEditPersonal}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Control placeholder="First Name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required/>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Control placeholder="Last Name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} required/>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} xs={4}>
                                    <Form.Label style={{margin:"5px 10px"}}>Date of Birth</Form.Label>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Input type="date" name="date" placeholder="date placeholder" value={dateOfBirth} onChange={(e)=>{setDateOfBirth(e.target.value)}} required/>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Select value={gender} onChange={(e)=>{setGender(e.target.value)}} placeholder="Gender" required>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Control placeholder="Specialization" value={specialization} onChange={(e)=>{setSpecialization(e.target.value)}} required/>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Control placeholder="City" value={city} onChange={(e)=>{setCity(e.target.value)}} required/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Control placeholder="Address" value={address} onChange={(e)=>{setAddress(e.target.value)}} required/>
                                </Form.Group>
                            </Row>

                            <Row style={{marginTop:"5px"}}>      
                                <Form.Group as={Col} xs={4}>
                                    <Form.Label style={{margin:"5px 10px"}}>Start Time</Form.Label>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Input type="time" name="time" value={startTime} onChange={(e)=>{setStartTime(e.target.value)}} placeholder="time placeholder" required/>
                                </Form.Group>
                            </Row>

                            <Row style={{marginTop:"5px", marginBottom:"15px"}}>      
                                <Form.Group as={Col} xs={4}>
                                    <Form.Label style={{margin:"5px 10px"}}>End Time</Form.Label>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Input type="time" name="time" id="exampleTime" placeholder="time placeholder" value={endTime} onChange={(e)=>{setEndTime(e.target.value)}} required/>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Input type="textarea" name="text" placeholder="Personal Bio" value={personalBio} onChange={(e)=>{setPersonalBio(e.target.value)}} required/>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} xs={7}>
                                    <Input type="number" name="number"placeholder="Hourly Charges" value={hourlyCharge} onChange={(e)=>{setHourlyCharge(e.target.value)}} required/>
                                </Form.Group>
                                <Form.Group as={Col} style={{marginTop: "5px"}}>
                                    <Label check>
                                        <Input type="checkbox" defaultChecked={onlineAvailability} onChange={(e)=>{setOnlineAvailability(!onlineAvailability)}}/>{' '}
                                        Available Online
                                    </Label>
                                </Form.Group>
                            </Row>

                        </Form>

                        <Row className="mb-3" style={{marginLeft: "0px"}}>
                            <Button onClick={()=>{setEditingPersonal(false)}} variant="outline-secondary" style={{width: "380px", margin: "5px 0px"}}>Cancel</Button>
                            <Button onClick={handleEditPersonal} variant="outline-success" type="submit" style={{width: "380px"}}>Confirm</Button>
                        </Row>

                    </Form>
                    {error && <Alert variant='danger'>{error}</Alert>}
                        </Card.Body>
                    </Card>
                    }
                </Tab>
                <Tab eventKey="hospitals" title="Hospitals">
                    
                <Table bordered hover style={{ width: '650px', margin:"0px 100px"}}>
                    <thead>
                        <tr>
                        <th>Hospital</th>
                        <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            
                        <td><Link onClick={()=>{console.log("Clicked")}}>1</Link></td>
                        <td>Mark</td>
                        <CloseButton variant="black" />
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <CloseButton variant="black" />

                        </tr>
                        <tr>
                        <td>3</td>
                        <td colSpan={1}>Larry the Bird</td>
                        <CloseButton variant="black" />

                        </tr>
                    </tbody>
                    </Table>

                    <Button variant="outline-danger" >Delete</Button>
                    <Button variant="outline-success" onClick={()=>{setAddingHospital(true)}}>Add</Button>
                    
                </Tab>
            </Tabs>

            
        </div>
     );
}
 
export default HospitalSettings