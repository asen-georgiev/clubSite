import React, {Component, useEffect, useState} from 'react';
import {CardImg, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../css/homepage.css';
import _ from "lodash";
import {getClubBio, getClubBios} from "../services/clubbioService";
import Card from "react-bootstrap/Card";
import {getEventsCalendar} from "../services/eventService";
import {getNews} from "../services/newsService";
import {picturesUrl} from "../config.json";
import {useTranslation} from "react-i18next";
import {getImages} from "../services/imageService";
import Carousel from "react-bootstrap/Carousel";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import {getCourses} from "../services/courseService";

const picUrl = process.env.REACT_APP_PICTURES_URL;

function Homepage(props) {

    const {t, i18n} = useTranslation();

    const [clubBio, setClubBio] = useState([]);
    const [eventCalendar, setEventCalendar] = useState([]);
    const [anew, setAnew] = useState([]);
    const [carousel, setCarousel] = useState([]);
    const [courses, setCourses] = useState([]);
    const [url,setUrl] = useState('');

    //В тъпия стейтлес компонент за да е асинхронна функцията,
    //требва да се извика допълнителна ламбда функция, която пък
    //да се самоизвика себе си респективно лайна с праз и се адва втори параметър [],
    //за да не забива браузъра щото влиза в лууп.
    useEffect(() => {
        (async () => {
            const url = picUrl;
            const {data: clubBios} = await getClubBios();
            const {data: eventsCalendar} = await getEventsCalendar();
            const {data: news} = await getNews();
            const {data: images} = await getImages();
            const {data: courses} = await getCourses();
            let clubBio = _.first(clubBios);
            let eventCalendar = _.first(eventsCalendar);
            let anew = _.first(news);
            let carousel = images.filter(img => img.includes('cr'));
            setClubBio(clubBio);
            setEventCalendar(eventCalendar);
            setAnew(anew);
            setCarousel(carousel);
            setCourses(courses);
            setUrl(url);
        })();
    }, []);


    return (
        <div>
            <Container className="home-container container d-flex flex-row" fluid={true}>

                <Row className="m-0">
                    <Col xs={6} lg={8}>

                        <Row className="home-row d-flex justify-content-start">
                            <h3>{t('Rows.Homepage.ClubBio')} :</h3>
                        </Row>

                        <Row>
                            <Card
                                style={{width: '50rem'}}
                                className="home-maincard ml-auto mr-auto">
                                <Card.Header>{clubBio.bioTitle}</Card.Header>
                                <Card.Body>
                                    <div className="card-img-wrap">
                                        <CardImg
                                            variant="bottom"
                                            src={require('../assets/images/wide.jpg')}/>
                                    </div>
                                    <br/>
                                    <Card.Text>{clubBio.bioText}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Card.Link
                                        className="home-cardlink"
                                        href="/clubbio">
                                        {t('Homepage.Links.LearnMore')}
                                    </Card.Link>
                                </Card.Footer>
                            </Card>
                        </Row>

                        <Row className="home-row d-flex justify-content-start">
                            <h3>{t('Rows.Homepage.SportEvent')} :</h3>
                        </Row>

                        <Row>
                            <Card
                                style={{width: '50rem'}}
                                className="home-eventcard ml-auto mr-auto">
                                <div className="card-img-wrap">
                                    <Card.Img
                                        className="home-eventcard-img"
                                        src={require('../assets/images/wide2.jpg')}
                                        alt="Card image"/>
                                    <Card.ImgOverlay className="overflow-auto">
                                        <Card.Title className="text-center">
                                            {eventCalendar.eventTitle}
                                        </Card.Title>
                                        <Card.Text className="text-center">
                                            {eventCalendar.eventInfo}
                                        </Card.Text>
                                        <Card.Text className="text-right">
                                            {eventCalendar.eventDate} {eventCalendar.eventLocation}
                                        </Card.Text>
                                        <Card.Text className="text-right">
                                            <Card.Link
                                                className="home-cardlink"
                                                href={"http://" + eventCalendar.eventLink}>
                                                {t('Homepage.Links.Info')}: {eventCalendar.eventLink}
                                            </Card.Link>
                                        </Card.Text>
                                        <Card.Text className="text-right">
                                            <Card.Link
                                                className="home-cardlink"
                                                href="/events">
                                                {t('Homepage.Links.LearnMore')}
                                            </Card.Link>
                                        </Card.Text>
                                    </Card.ImgOverlay>
                                </div>
                            </Card>
                        </Row>

                        <Row className="home-row d-flex justify-content-start">
                            <h3>{t('Rows.Homepage.News')}:</h3>
                        </Row>

                        <Row>
                            <Card
                                style={{width: '50rem'}}
                                className="home-maincard ml-auto mr-auto">
                                <Card.Header>{anew.newsDate}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{anew.title}</Card.Title>
                                    <Card.Subtitle>
                                        <Card.Link
                                            className="home-cardlink"
                                            href={"http://" + anew.linkTo}>
                                            {t('Homepage.Links.Info')}: {anew.linkTo}
                                        </Card.Link>
                                    </Card.Subtitle>
                                    <br/>
                                    <div className="card-img-wrap">
                                        <CardImg
                                            variant="bottom"
                                            src={url + anew.pictureName}/>
                                    </div>
                                    <br/>
                                    <Card.Text>{anew.text}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Card.Link
                                        className="home-cardlink"
                                        href="/news">
                                        {t('Homepage.Links.LearnMore')}
                                    </Card.Link>
                                </Card.Footer>
                            </Card>
                        </Row>
                    </Col>

                    <Col xs={8} md={4} lg={3} className="ml-3">

                        <Carousel
                            style={{width: '21.5rem'}}
                            className="mt-3">
                            {carousel.map((cr, index) => {
                                return (
                                    <Carousel.Item key={index}>
                                        <div className="card-img-wrap">
                                            <Image
                                                className="d-block w-100 rounded-lg"
                                                height='260rem'
                                                src={url+ cr}/>
                                        </div>
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>

                        <Card
                            style={{width: '21.5rem'}}
                            className="home-maincard mr-auto mt-3">
                            <Card.Header className="home-map-gsm">{t('Homepage.Contacts.CardHeader')}</Card.Header>
                            <Card.Body>
                                <Card.Title className="text-center">{t('Homepage.Contacts.CardTitle')}</Card.Title>
                                <Card.Subtitle
                                    className="text-center">{t('Homepage.Contacts.CardSubtitle')}</Card.Subtitle>
                                <br/>
                                <div className="mapouter">
                                    <div className="gmap_canvas">
                                        <iframe
                                            width="100%"
                                            height="200"
                                            id="gmap_canvas"
                                            src="https://maps.google.com/maps?q=Sandanski&t=&z=17&ie=UTF8&iwloc=&output=embed"
                                            frameBorder="0"
                                            scrolling="no">
                                        </iframe>
                                    </div>
                                </div>
                                <br/>
                                <Card.Text>{t('Homepage.Contacts.CardText')}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Card.Link
                                    className="home-cardlink"
                                    href="/contacts">
                                    {t('Homepage.Links.ContactUs')}
                                </Card.Link>
                            </Card.Footer>
                        </Card>

                        <Card
                            style={{width: '21.5rem'}}
                            className="home-maincard mr-auto mt-3">
                            <Card.Header className="home-map-gsm">
                                {t('Homepage.Schedule.CardHeader')}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className="text-center">
                                    {t('Homepage.Schedule.CardTitle')}
                                </Card.Title>
                                <Card.Subtitle className="text-center">
                                    {t('Homepage.Schedule.CardSubtitle')}
                                </Card.Subtitle>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                {courses.map((crs, index) => {
                                    return (
                                        <ListGroupItem key={index} className="home-listgroup">
                                            {crs.courseName}
                                        </ListGroupItem>
                                    )
                                })}
                            </ListGroup>
                            <Card.Footer>
                                <Card.Link
                                    className="home-cardlink"
                                    href="/schedule">
                                    {t('Homepage.Links.Schedule')}
                                </Card.Link>
                            </Card.Footer>
                        </Card>

                        <iframe
                            className="mt-3"
                            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIseido-Shotokan-Karate-club-142528162447145%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                            style={{border: "none", overflow: "hidden", width: '30rem', height: '32rem'}}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                        </iframe>

                        <iframe
                            className="mt-3"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"
                            width="344rem"
                            height="300rem"
                            src="https://www.youtube.com/embed/PGsJqmVLT7Y?autoplay=1&fs=1&iv_load_policy=3&showinfo=0&rel=1&cc_load_policy=0&start=0&end=0&origin=https://youtubeembedcode.com">
                        </iframe>

                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Homepage;
