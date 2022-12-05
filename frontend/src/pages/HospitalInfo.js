import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signup } from "../API/api";
import { hospitalAddEntry } from "../API/api";
import { removeAccount } from "../API/api";
import { UserState } from "../UserState";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { FormGroup, Label, Input} from 'reactstrap';

const HospitalInfo = () => {

    const userState = useContext(UserState)

    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')

    const [error, setError] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setError('')
    }, [name, city, address])

    const handleSubmit = async (e) => {

        e.preventDefault()
        let email = location.state.email
        let password = location.state.password

        let accountRes = await signup(email, password, 'hospital')

        if (accountRes.data.isSuccessful) {
    
            let accountID = accountRes.data.accountID
            localStorage.setItem('accountID', accountID)

            let res = await hospitalAddEntry(accountID, name, city, address)

            if (res.data.isSuccessful) {
                userState.setAccountID(accountID)
                userState.setAccountName(name)
                userState.setAccountType('hospital')

                userState["accountID"] = accountID
                userState["accountName"] = name
                userState["accountType"] = 'hospital'
                
                localStorage.setItem('userState', JSON.stringify(userState))

                navigate("/home")
                
            } else {
                removeAccount(accountID)
                setError(res.data.errorMessage)
            }
            
        } else {
            setError(accountRes.data.errorMessage)
        }
    }

    return ( 
        <div className="signup" style={{width:"400px", margin:"150px auto"}}>

            <h2>Personal Information</h2>

            <hr style={{width:"320px", margin:"20px auto"}}/>

            <Form onSubmit={handleSubmit} style={{textAlign:"left"}}>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Control placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Control placeholder="City" value={city} onChange={(e)=>{setCity(e.target.value)}} required/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Control placeholder="Address" value={address} onChange={(e)=>{setAddress(e.target.value)}} required/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Button variant="outline-success" type="submit" style={{width:"320px", margin:"auto"}}>Submit</Button>
                </Row>

            </Form>
            {error && <Alert variant='danger'>{error}</Alert>}
        </div>
    )
}
 
export default HospitalInfo;