import { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { search } from "../API/api";
import { UserState } from "../UserState";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

const Home = () => {

    const [searchString, setSearchString] = useState('')
    const [city, setCity] = useState('lahore')
    const [doctorResults, setDoctorResults] = useState(null)
    const [hospitalResults, setHospitalResults] = useState(null)
    const [showDoctors, setShowDoctors] = useState(true)
    const [showHospitals, setShowHospitals] = useState(true)
    const [pending, setPending] = useState(false)

    const userState = useContext(UserState);

    const handleSearch = async () => {

        if (searchString == '') {
            setHospitalResults('')
            setDoctorResults('')

        } else {
            setPending(true)
            search(searchString, city).then((res)=>{
                setPending(false)
                setDoctorResults(res.data.doctorList)
                setHospitalResults(res.data.hospitalList)   
            }) 
        }
    }

    useEffect(() => {
        setDoctorResults([])
        setHospitalResults([])
        if (searchString != '') {handleSearch()}
        else {setPending(false)}
        
    }, [searchString, city])

    return ( 
        <div className="home">
            <p style={{margin:"100px auto 15px"}} className="display-6">DHD</p>



            <InputGroup style={{width:"800px", margin:"15px auto"}}>
                <Form.Control placeholder="Search for doctors, hospitals, specialties, diseases" value={searchString} onChange={(e)=>{setSearchString(e.target.value)}}/>

                <div className="selectcity">
                    <Form.Select value={city} onChange={(e)=>{setCity(e.target.value)}}>
                        <option value="lahore">Lahore</option>
                        <option value="islamabad">Islamabad</option>
                        <option value="karachi">Karachi</option>
                        <option value="peshawar">Peshawar</option>
                        <option value="quetta">Quetta</option>
                        <option value="multan">Multan</option>
                        <option value="gujranwala">Gujranwala</option>
                        <option value="faislabad">Faislabad</option>
                        <option value="rawalpindi">Rawalpindi</option>
                    </Form.Select>
                </div>

                <DropdownButton variant="outline-dark" title="Filters">
                    
                    <Form.Check 
                    style={{marginLeft:"10px"}}
                    type="checkbox"
                    label="Show Doctors"
                    defaultChecked={true}
                    onChange={(e)=>{setShowDoctors(!showDoctors)}}
                    />
                    
                    <Form.Check 
                    style={{marginLeft:"10px"}}
                    type="checkbox"
                    label="Show Hospitals"
                    defaultChecked={true}
                    onChange={(e)=>{setShowHospitals(!showHospitals)}}
                    />
                </DropdownButton>
                
            </InputGroup>

            {pending && <Spinner style={{marginTop:"100px"}} animation="grow" />}
            
            
            <div className="results" style={{ width: '800px', margin:"15px auto" }}>
                {showDoctors && doctorResults && doctorResults.map((res) => (
                    
                    <Link to="/doctorPublic" state={{doctorID: res.accountID}} style={{textDecoration:"none", color:"black"}}>
                        <Card style={{ width: '800px', margin:"15px auto", textAlign:"left" }}>
                            <Card.Header as="h5">{`${res.firstName} ${res.lastName}`}</Card.Header>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">{res.specialization}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{`${res.address} ${res.city}`}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{`${res.hourlyCharge}/hour`}</Card.Subtitle>
                                <Card.Text>
                                {res.personalBio}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                ))}

                {showHospitals && hospitalResults && hospitalResults.map((res) => (
                    <Link to="/hospitalPublic" state={{hospitalID: res.accountID}} style={{textDecoration:"none", color:"black"}}>
                        <Card style={{ width: '800px', margin:"15px auto", textAlign:"left" }}>
                        <Card.Header as="h5">{`${res.name}`}</Card.Header>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">{`${res.address} ${res.city}`}</Card.Subtitle>
                                <Card.Text>
                                {res.personalBio}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                ))}
            </div>    

        </div>  
     );
}
 
export default Home