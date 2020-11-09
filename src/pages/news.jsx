import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import {getUsers} from "../services/userService";
import {getImages} from "../services/imageService";
import {CardImg, Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {getLastNew, getNews} from "../services/newsService";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import {picturesUrl} from "../config.json";


class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            news: [],
            anew:[]
        }
    }

    async componentDidMount() {

        const {data:news} = await getNews();
        const {data: anew} = await getLastNew();
        console.log('before setState')
        this.setState({news,anew});
        console.log(this.state);

    }


    render() {
        return (
            <div>
                <Container className="container bg-secondary">
                    <h1>News Array</h1>
                    <Row>
                        <Col>
                                    <Card style={{width: '22rem'}}>
                                        <CardImg variant="top" src={picturesUrl + this.state.anew.pictureName}/>
                                        <Card.Body>
                                            <Card.Title>{this.state.anew.title}</Card.Title>
                                            <Card.Text>{this.state.anew.text}</Card.Text>
                                            <Card.Footer>{this.state.anew.eventDate}</Card.Footer>
                                            <Card.Link href={"http://" + this.state.anew.linkTo}>{this.state.anew.linkTo}</Card.Link>
                                        </Card.Body>
                                    </Card>
                        </Col>
                        <Col>
                        {this.state.news.map(n => {
                                return (
                                    <Col sm={4} key={n.pictureName}>
                                        <Card style={{width: '22rem'}}>
                                            <CardImg variant="top" src={picturesUrl + n.pictureName}/>
                                            <Card.Body>
                                                <Card.Title>{n.title}</Card.Title>
                                                <Card.Text>{n.text}</Card.Text>
                                                <Card.Footer>{n.eventDate}</Card.Footer>
                                                <Card.Link href={"http://" + n.linkTo}>{n.linkTo}</Card.Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            }
                        )}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default News;
