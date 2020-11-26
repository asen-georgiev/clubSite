import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import {getUsers} from "../services/userService";
import {getImages} from "../services/imageService";
import {CardImg, Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {getLastNew, getNew, getNews} from "../services/newsService";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import {picturesUrl} from "../config.json";
import Newscards from "../components/newscards";
import _ from "lodash";
import '../css/news.css';
import Button from "react-bootstrap/Button";


class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            news: [],
            anew: []
        }
    }

    async componentDidMount() {

        const {data: news} = await getNews();
        let anew = _.first(news);
        this.setState({news, anew});
        console.log(this.state);

    }

    handleNews = async (anewId) => {
        const {data: anew} = await getNew(anewId);
        this.setState({anew: anew});
    }


    render() {
        return (
            <div>
                <Container className="news-containter container d-flex flex-row" fluid={true}>
                    <Row className="m-0">
                        <Col md={6}>
                            <Row className="news-row d-flex justify-content-start">
                                <h3>News from Karate world :</h3>
                            </Row>
                            <Card
                                className="news-maincard"
                                style={{width: '33rem'}}>
                                <Card.Header>
                                    Date: {this.state.anew.newsDate}
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>
                                        {this.state.anew.title}
                                    </Card.Title>
                                    <div className="card-img-wrap">
                                        <CardImg
                                            variant="bottom"
                                            src={picturesUrl + this.state.anew.pictureName}
                                            alt="No Image"/>
                                    </div>
                                    <br/>
                                    <Card.Text>
                                        {this.state.anew.text}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Card.Link
                                        className="news-cardlink"
                                        href={"http://" + this.state.anew.linkTo}>
                                        More info at : {this.state.anew.linkTo}
                                    </Card.Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Row className="news-row d-flex justify-content-start">
                                <h3>You may also want to read about :</h3>
                            </Row>
                            <Container fluid={true} className="p-0 news-newscontainer">
                                {this.state.news.map(ns => {
                                    return (
                                        <Card style={{width: '32rem'}}
                                              className="news-maincard flex-row p-2 mb-3 my-0">
                                            <CardImg
                                                variant="top"
                                                src={picturesUrl + ns.pictureName}
                                                style={{width: '10rem', height: '10rem'}}
                                                alt="No Image"/>
                                            <Card.Body>
                                                <Card.Title>{ns.title}</Card.Title>
                                                <Card.Subtitle>{ns.newsDate}</Card.Subtitle>
                                                <br/>
                                                <Button onClick={() => this.handleNews(ns._id)}>Read the whole
                                                    article</Button>
                                            </Card.Body>
                                        </Card>
                                    )
                                })}
                            </Container>
                            {/*<Newscards news={this.state.news} onNewSelect={this.handleNews}/>*/}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default News;
