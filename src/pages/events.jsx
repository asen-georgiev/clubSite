import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {getEventCalendar} from "../services/eventService";


class Events extends Component {
    constructor(props) {
        super(props);
        this.state={
            eventsCalendar:[]
        }
    }

    async componentDidMount() {
        const events = await getEventCalendar();
        const eventsCalendar = [events];
        this.setState({eventsCalendar});
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <Container>
                <h1>Events Calendar</h1>
                    <Table striped bordered hover variant="dark">
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
                        {this.state.eventsCalendar.map(item =>(
                            item.data.map(evt=>{
                                return(
                                    <tr key={evt._id}>
                                        <td>{evt.eventTitle}</td>
                                        <td>{evt.eventInfo}</td>
                                        <td>{evt.eventDate}</td>
                                        <td>{evt.eventLocation}</td>
                                        <td>
                                        <a href={"http://"+evt.eventLink}>{evt.eventLink}</a>
                                        </td>
                                    </tr>
                                )
                            })
                        ))}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Events;
