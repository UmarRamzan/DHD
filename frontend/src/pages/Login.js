import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login, patientGetInfo } from "../API/api";
import { UserContext } from "../UserContext";
import { UserState } from "../UserState";

import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


const Login = () => {

    const {accountID, setAccountID, accountType, setAccountType, accountName, setAccountName} = useContext(UserContext)
    const userState = useContext(UserState)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.state) {setError(location.state.message)}
    }, [])

    useEffect(() => {
        if (location.state) {setError(location.state.message)}
    }, [location.state])

    useEffect(() => {
        setError('')
    }, [email, password, accountType])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let res = await login(email, password)
        
        if (res.data.isSuccessful) {

            let userData = await patientGetInfo(res.data.accountID)

            if (userData.data.isSuccessful) {
                userState.setAccountID(res.data.accountID)
                userState.setAccountType(res.data.accountType)
                userState.setAccountName(userData.data.firstName)

                userState["accountID"] = res.data.accountID
                userState["accountName"] = userData.data.firstName
                userState["accountType"] = res.data.accountType
                
                localStorage.setItem('userState', JSON.stringify(userState))

                navigate('/home')

            } else {
                setError(res.data.errorMessage)
            }

        } else {
            setError(res.data.errorMessage)
        }
    }

    return ( 
        <div className="form" style={{width:"400px", margin:"150px auto"}}>
            <Container>
                <Form onSubmit={handleSubmit}>

                    <p className="display-6">Login</p>

                    <hr style={{width:"350px", margin:"20px auto"}}/>

                    <Stack gap={1} className="col-12 mx-auto">

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    </Form.Group>

                    <Button variant="outline-success" type="submit" className="my-2">Next</Button>

                    {error && <Alert variant='danger'>{error}</Alert>}

                    </Stack>

                </Form>    
            </Container>
        </div>
     );
}
 
export default Login;