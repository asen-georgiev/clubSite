import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {getTimeTables} from "../services/timetableService";
import {getCourses} from "../services/courseService";
import Carousel from "react-bootstrap/Carousel";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import '../css/schedule.css';


class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timetables: [],
            courses: []
        }
    }

    async componentDidMount() {
        const {data: timetables} = await getTimeTables();
        const {data: courses} = await getCourses();
        this.setState({timetables, courses});
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <Container className="schedule-container container d-flex flex-row" fluid={true}>
                    <Row className="m-0">
                        <Col md={6}>
                            <Row className="schedule-row d-flex justify-content-start">
                                <h3>Warriors Karate Dojo courses:</h3>
                            </Row>
                            <Row>
                                <CardDeck className="schedule-deck flex-column">
                                    {this.state.courses.map(crs => {
                                        return (
                                            <Card className="schedule-maincard mb-3">
                                                <Card.Header>Course age limit: {crs.courseAge}</Card.Header>
                                                <Card.Body>
                                                    <Card.Title>{crs.courseName}</Card.Title>
                                                    <Card.Text>{crs.courseInfo}</Card.Text>
                                                </Card.Body>
                                                <Card.Footer>Price: {crs.coursePrice} eur/month</Card.Footer>
                                            </Card>
                                        )
                                    })}
                                </CardDeck>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row className="schedule-row d-flex justify-content-start">
                                <h3>Training schedule:</h3>
                            </Row>
                            <Table striped bordered hover className="schedule-maincard">
                                <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Day</th>
                                    <th>Hours: from-to</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.timetables.map(timet => {
                                    return (
                                        <tr key={timet._id}>
                                            <td>{timet.course.courseName}</td>
                                            <td>{timet.timedh.day}</td>
                                            <td>{timet.timedh.hour}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Schedule;
