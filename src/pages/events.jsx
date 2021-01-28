import React, {Component, useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {getEventsCalendar} from "../services/eventService";
import '../css/events.css';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Paginate from "../components/paginate";
import {paginateFunct} from "../services/paginateFunct";


function Events(props) {

    const {t, i18n} = useTranslation();

    const [eventsCalendar, setEventsCalendar] = useState([]);
    const [eventsPerPage, setEventsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        (async () => {
            const {data: eventsCalendar} = await getEventsCalendar();
            setEventsCalendar(eventsCalendar);
        })();
    }, []);


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const paginateEvents = paginateFunct(eventsCalendar, eventsPerPage, currentPage);

    return (
        <div>
            <Container className="events-container container" fluid={true}>
                <Row className="m-0">
                    <Col>
                        <Row className="events-row d-flex justify-content-start mx-0">
                            <h3>{t('Rows.Events.Main')} :</h3>
                        </Row>
                        <Row className="m-0">
                            <Paginate
                                itemsCount={eventsCalendar.length}
                                itemsPerPage={eventsPerPage}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}/>
                            <Table striped bordered hover className="events-maincard">
                                <thead>
                                <tr>
                                    <th>{t('Events.Th1')}</th>
                                    <th>{t('Events.Th2')}</th>
                                    <th>{t('Events.Th3')}</th>
                                    <th>{t('Events.Th4')}</th>
                                    <th>{t('Events.Th5')}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginateEvents.map(evt => {
                                    return (
                                        <tr key={evt._id}>
                                            <td className="events-name">{evt.eventTitle}</td>
                                            <td>{evt.eventInfo}</td>
                                            <td className="events-date">{evt.eventDate}</td>
                                            <td className="events-location">{evt.eventLocation}</td>
                                            <td>
                                                <a className="events-cardlink"
                                                   href={"http://" + evt.eventLink}>
                                                    {evt.eventLink}
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </Row>
                        <Row className="events-row d-flex justify-content-center"
                             style={{marginBottom: 50, marginTop: 50, marginInline: 0}}>
                            <h5>{t('Events.Link1')} :&ensp;
                                <a className="events-cardlink"
                                   href={"https://www.wkf.net"}>
                                    wkf.net
                                </a>
                            </h5>&emsp;&emsp;&emsp;
                            <h5>{t('Events.Link2')} :&ensp;
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

export default Events;
