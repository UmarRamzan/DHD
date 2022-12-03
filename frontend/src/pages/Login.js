import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login, patientGetInfo } from "../API/api";
import { UserContext } from "../UserContext";

import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


const Login = () => {

    const {accountID, setAccountID, accountType, setAccountType, accountName, setAccountName} = useContext(UserContext)

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        let res = await login(email, password)
        
        if (res.data.isSuccessful) {

            let userData = await patientGetInfo(res.data.accountID)
            console.log(userData)

            if (userData.data.isSuccessful) {
                setAccountID(res.data.accountID)
                setAccountType(res.data.accountType)
                setAccountName(userData.data.firstName)

                console.log(userData)

                localStorage.setItem('accountID', res.data.accountID)
                localStorage.setItem('accountType', res.data.accountType)
                localStorage.setItem('accountName', userData.data.firstName)

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

                    <Button variant="outline-dark" type="submit" className="my-2">Next</Button>

                    {error && <Alert variant='danger'>{error}</Alert>}

                    </Stack>

                </Form>    
            </Container>
        </div>
     );
}
 
export default Login;