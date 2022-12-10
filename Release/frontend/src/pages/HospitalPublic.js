import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { hospitalGetInfo, doctorHospitalAddEntry, getDepartments, getDoctorHospital, getDoctorName, getHospitalName } from "../API/api";
import { Link, NavLink } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Spinner from 'react-bootstrap/Spinner';

import { UserState } from "../UserState";

const HospitalPublic = () => {

    const userState = useContext(UserState)
    const location = useLocation()

    const [data, setData] = useState({})
    const [department, setDepartment] = useState('')

    const [departmentList, setDepartmentList] = useState({})
    const [doctorDict, setDoctorDict] = useState({})

    const [pagePending, setPagePending] = useState(false)
    const [addHospitalPending, setAddHospitalPending] = useState(false)
    const [pending, setPending] = useState(false)
    
    const [addingHospital, setAddingHospital] = useState(false)

    let hospID = ''
    if (location.hash==''){hospID = location.state.hospitalID}
    else {hospID = localStorage.getItem('hospitalID')}
    
    useEffect(() => {

        localStorage.setItem('hospitalID', hospID)
        setPagePending(true)

        let data = hospitalGetInfo(hospID)
        let departmentData = getDoctorHospital(hospID)

        Promise.all([data, departmentData]).then((res)=>{
            
            setData(res[0].data)

            if (res[1].data.isSuccessful) {
                const temp = {}
                Promise.all(res[1].data.data.map(async (item)=>{
                    if (temp[item.department]) {
                        let docData =  await getDoctorName(item.doctorID)
                        temp[item.department].push([item.doctorID, `${docData.data.firstName} ${docData.data.lastName}`])
                    } else {
                        let docData =  await getDoctorName(item.doctorID)
                        temp[item.department] = [[item.doctorID, `${docData.data.firstName} ${docData.data.lastName}`]]
                    }
                })).then(()=>{setDepartmentList(temp); setPagePending(false)})
            }

        })
    }, [])

    const addHospital = async () => {
        setAddHospitalPending(true)
        let res = await doctorHospitalAddEntry(userState.accountID, hospID, department)

        if (res.data.isSuccessful) {
            if (departmentList[department]) {
                let docData =  await getDoctorName(userState.accountID)
                departmentList[department].push([userState.accountID, `${docData.data.firstName} ${docData.data.lastName}`])
            } else {
                let docData =  await getDoctorName(userState.accountID)
                departmentList[department] = [[userState.accountID, `${docData.data.firstName} ${docData.data.lastName}`]]
            }
            setDepartmentList(departmentList)
            setAddingHospital(false)  
        } else {
            console.log(res.data.errorMessage)
        }  
        setAddHospitalPending(false)
    }

    return ( 
        <div className="hospitalPublic">
            {pagePending && <Spinner style={{marginTop: "20%"}} animation="grow" />}
            {!pagePending && <div className="pageContent">
            <Row style={{marginTop: "50px"}}>
                <Col >
                <Card style={{ width: '800px', margin:"10px 0px 0px 100px", textAlign: "left" }}>
                    <Card.Header as="h2">{`${data.name}`}</Card.Header>
                
                    <Card.Body>
                        <p>{ `${data.address} ${data.city}` }</p>
                    </Card.Body>
                </Card>
                </Col>

                

                <Col xs={4} style={{margin: "0px 50px"}}>
                    <Row>
                        <Col xs={8}>
                        <h3>Departements</h3> 
                        </Col>
                        <Col>
                        {userState.accountType!='doctor' &&
                        <OverlayTrigger key="top" placement="bottom"
                                overlay={
                                <Tooltip id={`tooltip`}> Only <strong>{"doctors"}</strong> can link with a hospital</Tooltip>
                                }
                                >
                                <span className="d-inline-block">
                        <Button disabled variant="outline-success" onClick={()=>{setAddingHospital(true)}}>Link with hospital</Button>
                        </span>
                        </OverlayTrigger>
                        }

                        {userState.accountType=='doctor' && 
                        <div className="addHospitalButtons">
                        {!addingHospital && <Button variant="outline-success" onClick={()=>{setAddingHospital(true)}}>Link with hospital</Button>}
                        </div>
                        }
                        </Col>
                    </Row>

                    { addingHospital &&
                    <Card style={{ width: '500px', margin: '20px auto',textAlign: "left" }}>
                        
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="input" placeholder="Department" rows={3} onChange={(e)=>{setDepartment(e.target.value)}} />
                                </Form.Group>
                                <Button style={{margin:"0px 5px"}} variant="outline-secondary" onClick={()=>{setAddingHospital(false)}}>Cancel</Button>
                                {!addHospitalPending && <Button style={{margin:"0px 5px", width: "90px"}} variant="outline-success" onClick={addHospital}>Confirm</Button>}
                                {addHospitalPending && <Button style={{margin:"0px 5px", width: "90px"}} variant="outline-success" onClick={addHospital}><Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                /></Button>}
                            </Form>
                        </Card.Body>
                    </Card>
                    }
                    
                    <hr/>
                    <Tab.Container id="list-group-tabs-example">
                    <Row>
                        <Col sm={4}>
                        <ListGroup>
                            {departmentList && Object.entries(departmentList).map(([key, value]) => (
                                <ListGroup.Item action href={`#${key}`}>
                                {key}
                                </ListGroup.Item>
                            ) )}
                        </ListGroup>
                        </Col>
                        <Col sm={8}>
                        <Tab.Content>
                            {departmentList && Object.entries(departmentList).map(([key, value]) => (
                                <Tab.Pane eventKey={`#${key}`}>
                                    <ListGroup>
                                        {value.map((item) => (
                                            <Link to="/doctorPublic" state={{doctorID: item[0]}} style={{textDecoration:"none", color:"blue"}}>
                                            <ListGroup.Item style={{color: "blue"}}>{item[1]}</ListGroup.Item></Link>
                                        ))}
                                    </ListGroup>
                                </Tab.Pane>
                            ) )}
                            
                        </Tab.Content>
                        </Col>
                    </Row>
                    </Tab.Container>
                </Col>
            </Row>
            </div>}
        </div>
     );
}
 
export default HospitalPublic;