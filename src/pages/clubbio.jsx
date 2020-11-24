import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {getClubBios} from "../services/clubbioService";
import {Image} from "react-bootstrap";
import Biographs from "../components/biographs";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import '../css/clubbio.css';


class Clubbio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clubBios: []
        }
    }

    async componentDidMount() {
        const {data: clubBios} = await getClubBios();
        this.setState({clubBios});
        console.log(this.state);
    }


    render() {
        return (
            <div>
                <Container className="bio-container container" fluid={true}>

                    <Row className="m-0">
                    <Col>
                        <Row className="bio-row d-flex justify-content-start">
                            <h3>Warriors Karate Dojo History :</h3>
                        </Row>
                    <Row>
                        <Card
                            style={{width: '80rem'}}
                            className="bio-biocard ml-auto mr-auto">
                            <div className="card-img-wrap">
                                <Card.Img
                                    className="bio-biocard-img"
                                    src={require('../assets/images/karate1.jpg')}
                                    alt="Card image"/>
                                <Card.ImgOverlay className="overflow-auto d-flex align-items-stretch">
                                    <Carousel>
                                        {this.state.clubBios.map(cbs => {
                                            return (
                                                <Carousel.Item>
                                                    <h3>{cbs.bioTitle}</h3>
                                                    {cbs.bioText}
                                                </Carousel.Item>
                                            )
                                        })}
                                    </Carousel>
                                </Card.ImgOverlay>
                            </div>
                        </Card>
                    </Row>
                    </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Clubbio;
