import React, {Component} from 'react';
import {CardImg, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../css/homepage.css';
import _ from "lodash";
import {getClubBio} from "../services/clubbioService";
import Card from "react-bootstrap/Card";
import {getEventsCalendar} from "../services/eventService";
import {getNews} from "../services/newsService";
import {picturesUrl} from "../config.json";
import {useTranslation} from "react-i18next";


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clubBio: '',
            eventCalendar: [],
            anew: []
        }
    }

    async componentDidMount() {
        const {data: clubBio} = await getClubBio('5fad32139de88d1c7e29fcb8');
        const {data: eventsCalendar} = await getEventsCalendar();
        const {data: news} = await getNews();
        let eventCalendar = _.first(eventsCalendar);
        let anew = _.first(news);
        this.setState({clubBio, eventCalendar, anew});
        console.log(this.state);
    }


    render() {

        return (
            <div>
                <Container className="home-container container d-flex flex-row" fluid={true}>
                    <Row className="m-0">
                        <Col xs={6} lg={8}>

                            <Row className="home-row d-flex justify-content-start">
                                <h3>About Warriors Karate Dojo:</h3>
                            </Row>

                            <Row>
                                <Card
                                    style={{width: '50rem'}}
                                    className="home-maincard ml-auto mr-auto">
                                    <Card.Header>{this.state.clubBio.bioTitle}</Card.Header>
                                    <Card.Body>
                                        <CardImg
                                            variant="bottom"
                                            src={require('../assets/images/asen-team.jpg')}/>
                                        <br/><br/>
                                        <Card.Text>{this.state.clubBio.bioText}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Card.Link
                                            className="home-cardlink"
                                            href="/clubbio">
                                            Do you want to learn more?
                                        </Card.Link>
                                    </Card.Footer>
                                </Card>
                            </Row>

                            <Row className="home-row d-flex justify-content-start">
                                <h3>Sport Calendar Events:</h3>
                            </Row>

                            <Row>
                                <Card
                                    style={{width: '50rem'}}
                                    className="home-eventcard ml-auto mr-auto">
                                    <Card.Img
                                        className="home-eventcard-img"
                                        src={require('../assets/images/karate1.jpg')}
                                        alt="Card image"/>
                                    <Card.ImgOverlay>
                                        <Card.Title className="text-center">
                                            {this.state.eventCalendar.eventTitle}
                                        </Card.Title>
                                        <Card.Text className="text-center">
                                            {this.state.eventCalendar.eventInfo}
                                        </Card.Text>
                                        <Card.Text className="text-right">
                                            {this.state.eventCalendar.eventDate} {this.state.eventCalendar.eventLocation}
                                        </Card.Text>
                                        <Card.Text className="text-right">
                                            <Card.Link
                                                className="home-cardlink"
                                                href={"http://" + this.state.eventCalendar.eventLink}>
                                                Additional info: {this.state.eventCalendar.eventLink}
                                            </Card.Link>
                                        </Card.Text>
                                        <Card.Text className="text-right">
                                            <Card.Link
                                                className="home-cardlink"
                                                href="/events">
                                                Do you want to learn more?
                                            </Card.Link>
                                        </Card.Text>
                                    </Card.ImgOverlay>
                                </Card>
                            </Row>

                            <Row className="home-row d-flex justify-content-start">
                                <h3>Recent News:</h3>
                            </Row>

                            <Row>
                                <Card
                                    style={{width: '50rem'}}
                                    className="home-maincard ml-auto mr-auto">
                                    <Card.Header>{this.state.anew.newsDate}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{this.state.anew.title}</Card.Title>
                                        <Card.Subtitle>
                                            <Card.Link
                                                className="home-cardlink"
                                                href={"http://" + this.state.anew.linkTo}>
                                                Additional info: {this.state.anew.linkTo}
                                            </Card.Link>
                                        </Card.Subtitle>
                                        <br/>
                                        <CardImg
                                            variant="bottom"
                                            src={picturesUrl + this.state.anew.pictureName}/>
                                        <br/><br/>
                                        <Card.Text>{this.state.anew.text}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Card.Link
                                            className="home-cardlink"
                                            href="/news">
                                            Do you want to learn more?
                                        </Card.Link>
                                    </Card.Footer>
                                </Card>
                            </Row>
                        </Col>

                        <Col xs={8} md={4} lg={3} className="ml-3">

                            <iframe
                                className="mt-3"
                                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIseido-Shotokan-Karate-club-142528162447145%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                                style={{border: "none", overflow: "hidden", width: '30rem', height: '32rem'}}
                                scrolling="no" frameBorder="0"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>

                            <Card style={{width: '21.5rem'}} className="home-maincard mr-auto">
                                <Card.Header>gsm: +359/897 05 73 75</Card.Header>
                                <Card.Body>
                                    <Card.Title>Warriors karate dojo</Card.Title>
                                    <Card.Subtitle>e-mail: warriors@abv.bg</Card.Subtitle>
                                    <br/>
                                    <div className="mapouter">
                                        <div className="gmap_canvas">
                                            <iframe width="304" height="200" id="gmap_canvas"
                                                    src="https://maps.google.com/maps?q=Sandanski&t=&z=17&ie=UTF8&iwloc=&output=embed"
                                                    frameBorder="0" scrolling="no"></iframe>
                                            <a href="https://www.whatismyip-address.com/divi-discount/"></a></div>
                                    </div>
                                    <br/>
                                    <Card.Text>Bulgaria, Sandanski 2800 Dimitar Popgeorgiev str.1</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Card.Link
                                        className="home-cardlink"
                                        href="/contacts">
                                        Contact us
                                    </Card.Link>
                                </Card.Footer>
                            </Card>

                        </Col>

                    </Row>
                    {/*<div>*/}
                    {/*    <script src="https://apps.elfsight.com/p/platform.js" defer></script>*/}
                    {/*    <div className="elfsight-app-b2a7e0dc-e66f-4854-ba09-4ae54c0cca60"></div>*/}
                    {/*</div>*/}
                </Container>
            </div>
        );
    }
}

export default Homepage;
