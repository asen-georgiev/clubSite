import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {deleteEventCalendar, getEventsCalendar} from "../services/eventService";

class AllEventsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    async componentDidMount() {
        const {data: events} = await getEventsCalendar();
        this.setState({events});
        console.log(this.state.events);
    }

    handleDelete = async (eventCalendar) => {
        const allEventsCalendar = this.state.events;
        const events = allEventsCalendar.filter(evt => evt._id !== eventCalendar._id);
        this.setState({events});

        try {
            await deleteEventCalendar(eventCalendar._id);
        } catch (e) {
            if (e.response && e.response.status === 404)
                console.log("Event Calendar with the given ID was not found!");
            toast.error("This Even has already been deleted!");
            this.setState({allEventsCalendar});
        }
    }

    adminRedirect = () => {
        this.props.history.push("/admin");
    }

    render() {
        return (
            <div>
                <Container fluid={true}>
                    <h1>All Events List</h1>
                    <Row>
                        <Col md={4}>
                            <Button variant="primary" onClick={this.adminRedirect}>
                                Back to Admin Panel
                            </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>Event name</th>
                            <th>Information</th>
                            <th>Date of the event</th>
                            <th>Location</th>
                            <th>Additional Info</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.events.map(evt => {
                            return (
                                <tr key={evt._id}>
                                    <td>{evt.eventTitle}</td>
                                    <td>{evt.eventInfo}</td>
                                    <td>{evt.eventDate}</td>
                                    <td>{evt.eventLocation}</td>
                                    <td>{evt.eventLink}</td>
                                    <td>
                                        <Link to={`/admin/eventslist/${evt._id}`}>
                                            Update
                                        </Link>
                                    </td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => this.handleDelete(evt)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default AllEventsList;
