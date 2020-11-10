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
import Newscards from "../components/newscards";


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
        const {data: anew} = await getLastNew();
        console.log('before setState')
        this.setState({news, anew});
        console.log(this.state);

    }


    render() {
        return (
            <div>
                <Container className="container bg-secondary">
                    <Newscards news={this.state.news}/>
                </Container>
            </div>
        );
    }
}

export default News;
