import React, {Component, useEffect, useState} from 'react';
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
import {useTranslation} from "react-i18next";


function Schedule(props) {

    const {t, i18n} = useTranslation();

    const [timetables, setTimetables] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        (async () => {
            const {data: timetables} = await getTimeTables();
            const {data: courses} = await getCourses();
            setTimetables(timetables);
            setCourses(courses);
        })()
    }, []);


    return (
        <div>
            <Container className="schedule-container container d-flex flex-row" fluid={true}>
                <Row className="m-0">
                    <Col md={6} className="mb-4">
                        <Row className="schedule-row d-flex justify-content-start">
                            <h3>{t('Rows.Schedule.Courses')} :</h3>
                        </Row>
                        <Row className="overflow-auto m-0" style={{height: 700}}>
                            <CardDeck className="schedule-deck flex-column">
                                {courses.map(crs => {
                                    return (
                                        <Card className="schedule-maincard mb-3">
                                            <Card.Header className="schedule-age">
                                                {t('Schedule.CardHeader')}: {crs.courseAge}
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Title>{crs.courseName}</Card.Title>
                                                <Card.Text>{crs.courseInfo}</Card.Text>
                                            </Card.Body>
                                            <Card.Footer className="schedule-price">
                                                {t('Schedule.CardFooter1')}: {crs.coursePrice} {t('Schedule.CardFooter2')}
                                            </Card.Footer>
                                        </Card>
                                    )
                                })}
                            </CardDeck>
                        </Row>
                    </Col>
                    <Col md={6} className="mb-4">
                        <Row className="schedule-row d-flex justify-content-start">
                            <h3>{t('Rows.Schedule.Schedule')}:</h3>
                        </Row>
                        <Row className="m-0 overflow-auto" style={{height: 700}}>
                            <Table striped bordered hover className="schedule-maincard">
                                <thead>
                                <tr>
                                    <th>{t('Schedule.Th1')}</th>
                                    <th>{t('Schedule.Th2')}</th>
                                    <th>{t('Schedule.Th3')}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {timetables.map(timet => {
                                    return (
                                        <tr key={timet._id}>
                                            <td>{timet.course.courseName}</td>
                                            <td className="schedule-day">{timet.timedh.day}</td>
                                            <td className="schedule-hour">{timet.timedh.hour}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Schedule;
