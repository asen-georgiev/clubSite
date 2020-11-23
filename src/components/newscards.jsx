import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {CardImg, Image} from "react-bootstrap";
import {picturesUrl} from "../config.json";
import Button from "react-bootstrap/Button";

class Newscards extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                    {this.props.news.map(n=>{
                        return(
                            <Col key={n.pictureName}>
                                <Card style={{width: '31rem'}} className="news-maincard flex-row p-2 mb-3 my-0">
                                    <CardImg variant="top" src={picturesUrl + n.pictureName} style={{width: '10rem', height:'10rem'}}/>
                                    <Card.Body>
                                        <Card.Title>{n.title}</Card.Title>
                                        <Card.Subtitle>{n.newsDate}</Card.Subtitle>
                                        <br/>
                                        <Button onClick={() => this.props.onNewSelect(n)}>Read the whole article</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
            </div>
        );
    }
}

export default Newscards;
