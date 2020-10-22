import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import {getUsers} from "../services/userService";
import {getImages} from "../services/imageService";
import {Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {getNews} from "../services/newsService";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";


class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            images: [],
            news: []
        }
    }

    async componentDidMount() {
        const gallery = await getImages();
        const images = [gallery];

        const data = await getUsers();
        const user = [data];

        const events = await getNews();
        const news = [events];

        console.log('before setState')
        this.setState({user, images, news});
        console.log(this.state);

    }


    render() {
        return (
            <div>
                <h1>Users Array</h1>
                <ul>
                    {this.state.user.map((user, index) => {
                        return (
                            <ul key={index}>
                                <li>
                                    <div>{user.data[0].name}</div>
                                </li>
                                <li>
                                    <div>{user.data[0].email}</div>
                                </li>
                            </ul>
                        );
                    })}
                </ul>
                <h1>Pictures Gallery</h1>
                <Row>
                    {this.state.images.map(image => (
                        image.data.map(pic => {
                            return (
                                <Col key={pic}>
                                    <Image src={"http://localhost:3900/" + pic} width="400" height="auto"/>
                                </Col>
                            )
                        }))
                    )}
                </Row>
                <h1>News Array</h1>
                <Row>
                    {this.state.news.map(ne => (
                        ne.data.map(n => {
                            return (
                                <Container key={n.pictureName}>
                                    <Row>
                                        <Col sm={4}>
                                            <Image src={"http://localhost:3900/" + n.pictureName} width="300"/>
                                        </Col>
                                        <Col sm={8}>
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>{n.title}</Card.Title>
                                                    <Card.Text>{n.text}</Card.Text>
                                                    <Card.Link href={"http://"+n.linkTo}>{n.linkTo}</Card.Link>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            )
                        })
                    ))}
                </Row>
            </div>
        );
    }
}

export default News;
