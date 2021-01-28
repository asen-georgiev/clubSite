import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import '../../css/admin.css';
import {deleteEventCalendar, getEventsCalendar} from "../../services/eventService";
import Paginate from "../../components/paginate";
import {paginateFunct} from "../../services/paginateFunct";

class AllEventsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            eventsPerPage: 4,
            currentPage: 1
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
            toast.error("This Event has already been deleted!");
            this.setState({events: allEventsCalendar});
        }
    }

    handlePageChange = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        });
    }

    adminRedirect = () => {
        this.props.history.push("/admin");
    }

    render() {

        const paginatedEvents = paginateFunct(this.state.events, this.state.eventsPerPage, this.state.currentPage)
        return (
            <div>
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>All Sport events list :</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Header className="d-flex flex-row justify-content-between">
                                    <Button className="admin-button-update" onClick={this.adminRedirect}>
                                        BACK TO ADMIN PANEL
                                    </Button>
                                    <Paginate
                                        className="m-0"
                                        itemsCount={this.state.events.length}
                                        itemsPerPage={this.state.eventsPerPage}
                                        currentPage={this.state.currentPage}
                                        onPageChange={this.handlePageChange}/>
                                </Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover className="admin-maincard">
                                        <thead>
                                        <tr>
                                            <th>Event</th>
                                            <th>Information</th>
                                            <th>Date</th>
                                            <th>Location</th>
                                            <th>Additional Info</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {paginatedEvents.map(evt => {
                                            return (
                                                <tr key={evt._id}>
                                                    <td>{evt.eventTitle}</td>
                                                    <td>
                                                        <div
                                                            className="overflow-auto"
                                                            style={{height: 130}}>
                                                            {evt.eventInfo}
                                                        </div>
                                                    </td>
                                                    <td>{evt.eventDate}</td>
                                                    <td>{evt.eventLocation}</td>
                                                    <td>
                                                        <Card.Link
                                                            className="admin-cardlink"
                                                            href={"http://" + evt.eventLink}>
                                                            {evt.eventLink}
                                                        </Card.Link>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            className="admin-button-submit btn"
                                                            to={`/admin/eventslist/${evt._id}`}>
                                                            Update
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            className="admin-button-delete"
                                                            onClick={() => this.handleDelete(evt)}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AllEventsList;
