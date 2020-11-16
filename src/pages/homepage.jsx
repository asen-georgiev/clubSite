import React, {Component} from 'react';
import {CardImg, Container, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../css/homepage.css';
import {getClubBio} from "../services/clubbioService";
import Card from "react-bootstrap/Card";


class Homepage extends Component {
        constructor(props) {
            super(props);
            this.state = {
                clubBio:''
            }
        }

        async componentDidMount() {
            const {data: clubBio} = await getClubBio('5fad32139de88d1c7e29fcb8');
            this.setState({clubBio});
            console.log(this.state.clubBio);
        }

    render() {
        return (
            <div>
                <Container className="home-bckg" fluid={true}>
                    <Container className="container" fluid={true}>
                    <Row>
                        <Col>
                        <Card style={{width: '60rem', height:'16rem'}} className="home-maincard ml-auto mr-auto">
                            {/*<CardImg*/}
                            {/*    src={require('../assets/images/karate1.jpg')}*/}
                            {/*    width="300"*/}
                            {/*    height="auto"*/}
                            {/*/>*/}
                            <Card.Body className="card-img-overlay">
                                <Card.Title>{this.state.clubBio.bioTitle}</Card.Title>
                                <Card.Text>{this.state.clubBio.bioText}</Card.Text>
                                <Card.Link className="home-cardlink" href="/clubbio">Want to learn more?</Card.Link>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Row>
                    <iframe
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIseido-Shotokan-Karate-club-142528162447145%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                        width="340" height="500" style={{border:"none", overflow:"hidden"}} scrolling="no" frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                </Container>
                </Container>
            </div>
        );
    }
}

export default Homepage;
