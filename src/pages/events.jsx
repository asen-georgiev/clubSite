import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {getEventsCalendar} from "../services/eventService";
import '../css/events.css';
import {Link} from "react-router-dom";


class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsCalendar: []
        }
    }

    async componentDidMount() {
        const events = await getEventsCalendar();
        const eventsCalendar = [events];
        this.setState({eventsCalendar});
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <Container className="events-container container" fluid={true}>
                    <Row className="m-0">
                        <Col>
                            <Row className="events-row d-flex justify-content-start">
                                <h3>Karate Sport Events Calendar :</h3>
                            </Row>
                            <Row>
                                <Table striped bordered hover className="events-maincard">
                                    <thead>
                                    <tr>
                                        <th>Event name</th>
                                        <th>Information</th>
                                        <th>Date of event</th>
                                        <th>Location</th>
                                        <th>Additional info</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.eventsCalendar.map(item => (
                                        item.data.map(evt => {
                                            return (
                                                <tr key={evt._id}>
                                                    <td>{evt.eventTitle}</td>
                                                    <td>{evt.eventInfo}</td>
                                                    <td>{evt.eventDate}</td>
                                                    <td>{evt.eventLocation}</td>
                                                    <td>
                                                        <a className="events-cardlink"
                                                           href={"http://" + evt.eventLink}>
                                                            {evt.eventLink}
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    ))}
                                    </tbody>
                                </Table>
                            </Row>
                            <Row className="events-row d-flex justify-content-center">
                                <h5>World Karate Federation :&ensp;
                                    <a className="events-cardlink"
                                       href={"https://www.wkf.net"}>
                                        wkf.net
                                    </a>
                                </h5>&emsp;&emsp;&emsp;
                                <h5>Sport Data:&ensp;
                                    <a className="events-cardlink"
                                       href={"https://www.sportdata.org/"}>
                                        sportdata.org
                                    </a>
                                </h5>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Events;
