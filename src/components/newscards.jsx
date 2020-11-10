import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {CardImg, Image} from "react-bootstrap";
import {picturesUrl} from "../config.json";

class Newscards extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Row>
                    {this.props.news.map(n=>{
                        return(
                            <Col key={n.pictureName}>
                                <Card style={{width: '45rem'}} className="flex-row p-2 m-3">
                                    <CardImg variant="top" src={picturesUrl + n.pictureName} style={{width: '15rem'}}/>
                                    <Card.Body>
                                        <Card.Title>{n.title}</Card.Title>
                                        <Card.Text>{n.text}</Card.Text>
                                        <Card.Footer>{n.newsDate}</Card.Footer>
                                        <Card.Link href={"http://" + n.linkTo}>{n.linkTo}</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        );
    }
}

export default Newscards;
