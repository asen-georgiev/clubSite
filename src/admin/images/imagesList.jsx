import React, {Component} from 'react';
import {getImages} from "../../services/imageService";
import Container from "react-bootstrap/Container";
import {Button, Image} from "react-bootstrap";
import {picturesUrl} from "../../config.json";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../../css/admin.css';
import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/CardImg";
import CardDeck from "react-bootstrap/CardDeck";
import CardColumns from "react-bootstrap/CardColumns";

class ImagesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    async componentDidMount() {
        const {data: images} = await getImages();
        this.setState({images});
        console.log(this.state.images);
    }

    adminRedirect = () => {
        this.props.history.push("/admin");
    }

    render() {
        return (
            <div>
                <Container className="admin-container container">
                    <Row className="m-0">
                        <Col>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>Images Gallery :</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Header>
                                    <Button className="admin-button-update" onClick={this.adminRedirect}>
                                        BACK TO ADMIN PANEL
                                    </Button>
                                </Card.Header>
                                <Card.Body>
                                    <CardColumns>
                                        {this.state.images.map(img => {
                                            return (
                                                <Card
                                                    key={img}
                                                    className="admin-maincard">
                                                    <Card.Header>
                                                        Picture name: {img}
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <div className="card-img-wrap">
                                                            <CardImg
                                                                src={picturesUrl + img}
                                                                alt="No Image"/>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            )
                                        })}
                                    </CardColumns>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ImagesList;
