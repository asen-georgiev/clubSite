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
import Paginate from "../../components/paginate";
import {paginateFunct} from "../../services/paginateFunct";


const picUrl = process.env.REACT_APP_PICTURES_URL;


class ImagesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            imagesPerPage: 6,
            currentPage: 1
        }
    }

    async componentDidMount() {
        const {data: images} = await getImages();
        this.setState({images});
        console.log(this.state.images);
    }

    handlePageChange = (pageNumber) => {
        this.setState({currentPage: pageNumber});
    }


    adminRedirect = () => {
        this.props.history.push("/admin");
    }

    render() {

        const paginatedImages = paginateFunct(this.state.images, this.state.imagesPerPage, this.state.currentPage);

        return (
            <div>
                <Container className="admin-container container">
                    <Row className="m-0">
                        <Col>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>Images Gallery :</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Header className="d-flex flex-row justify-content-between">
                                    <Button className="admin-button-update" onClick={this.adminRedirect}>
                                        BACK TO ADMIN PANEL
                                    </Button>
                                    <Paginate
                                        className="m-0"
                                        itemsCount={this.state.images.length}
                                        itemsPerPage={this.state.imagesPerPage}
                                        currentPage={this.state.currentPage}
                                        onPageChange={this.handlePageChange}/>
                                </Card.Header>
                                <Card.Body>
                                    <CardColumns>
                                        {paginatedImages.map(img => {
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
                                                                src={picUrl + img}
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
