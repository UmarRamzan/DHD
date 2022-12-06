import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { hospitalGetInfo } from "../API/api";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HospitalPublic = () => {

    const [data, setData] = useState({})

    const location = useLocation()

    useEffect(() => {
        let hospitalID = location.state.hospitalID

        let data = hospitalGetInfo(hospitalID)
        data.then((res) => {console.log(data); setData(res.data)})
    }, [])

    return ( 
        <div className="hospitalPublic">
            <Row style={{marginTop: "50px"}}>

                <Col xs={5} style={{margin: "0px 10px"}}>
                    <h1>{ data.name }</h1>
                    <p>{ data.city }</p>
                    <p>{ data.address }</p>
                </Col>

                <Col xs={5} style={{margin: "0px 10px"}}>
                    <h3>Departements</h3>
                    <ListGroup defaultActiveKey="#link1">
                        <ListGroup.Item action href="#link1">
                            Link 1
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link2" disabled>
                            Link 2
                        </ListGroup.Item>
                        <ListGroup.Item action>
                            This one is a button
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

        </div>
     );
}
 
export default HospitalPublic;