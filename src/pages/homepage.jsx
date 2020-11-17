import React, {Component} from 'react';
import {CardImg, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../css/homepage.css';
import _ from "lodash";
import {getClubBio} from "../services/clubbioService";
import Card from "react-bootstrap/Card";
import {getEventsCalendar} from "../services/eventService";


class Homepage extends Component {
        constructor(props) {
            super(props);
            this.state = {
                clubBio:'',
                eventCalendar:[]
            }
        }

        async componentDidMount() {
            const {data: clubBio} = await getClubBio('5fad32139de88d1c7e29fcb8');
            const {data: eventsCalendar} = await getEventsCalendar();
            let eventCalendar = _.first(eventsCalendar);
            this.setState({clubBio,eventCalendar});
            console.log(this.state);
        }



    render() {
        return (
            <div>
                    <Container className="home-container container overflow-auto" fluid={true}>
                        <Row className="home-row d-flex justify-content-start">
                            <h3>About Warriors Karate Dojo:</h3>
                        </Row>
                        <Row>
                            <Card style={{width: '60rem'}}className="home-maincard ml-auto mr-auto">
                                <Card.Body>
                                    <Card.Title>
                                        {this.state.clubBio.bioTitle}
                                    </Card.Title>
                                <CardImg variant="bottom" src={require('../assets/images/asen-team.jpg')} />
                                <Card.Text>{this.state.clubBio.bioText}</Card.Text>
                                    <Card.Link className="home-cardlink" href="/clubbio">Want to learn more?</Card.Link>
                                    </Card.Body>
                            </Card>
                        </Row>
                        <Row className="home-row d-flex justify-content-start">
                            <h3>Sport Calendar Events:</h3>
                        </Row>
                         <Row>
                        <Card style={{width: '60rem'}} className="home-eventcard ml-auto mr-auto">
                            <Card.Img
                                className="home-eventcard-img"
                                src={require('../assets/images/karate1.jpg')}
                                alt="Card image" />
                            <Card.ImgOverlay>
                                <Card.Title className="text-center">
                                    {this.state.eventCalendar.eventTitle}
                                </Card.Title>
                                <Card.Text className="text-center">
                                    {this.state.eventCalendar.eventInfo}
                                </Card.Text>
                                <Card.Text className="text-right" >
                                    {this.state.eventCalendar.eventDate} {this.state.eventCalendar.eventLocation}
                                </Card.Text>
                                <Card.Text className="text-right">
                                <Card.Link
                                    className="home-cardlink"
                                    href={"http://"+this.state.eventCalendar.eventLink}>
                                    Additional info at: {this.state.eventCalendar.eventLink}
                                </Card.Link>
                                </Card.Text>
                                <Card.Text className="text-right">
                                <Card.Link
                                    className="home-cardlink"
                                    href="/events">
                                    Want to learn more?
                                </Card.Link>
                                </Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </Row>
                    {/*<iframe*/}
                    {/*    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIseido-Shotokan-Karate-club-142528162447145%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"*/}
                    {/*    width="340" height="500" style={{border:"none", overflow:"hidden"}} scrolling="no" frameBorder="0"*/}
                    {/*    allowFullScreen={true}*/}
                    {/*    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>*/}
                </Container>
            </div>
        );
    }
}

export default Homepage;
