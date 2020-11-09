import React, {Component} from 'react';
import {getImages} from "../../services/imageService";
import Container from "react-bootstrap/Container";
import {Button, Image} from "react-bootstrap";
import {picturesUrl} from "../../config.json";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class ImagesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    async componentDidMount() {
        const{data: images} = await getImages();
        this.setState({images});
        console.log(this.state.images);
    }

    adminRedirect = () => {
        this.props.history.push("/admin");
    }

    render() {
        return (
            <div>
                <Container className="container bg-secondary">
                    <h1>All Images</h1>
                    <Row>
                    {this.state.images.map(img =>{
                        return(
                            <div>
                                    <Col>
                            <Image src={picturesUrl+img} width="300"/>
                                    </Col>
                            <br/>
                            </div>
                        )
                    })}
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Button variant="primary" onClick={this.adminRedirect}>
                                Back to Admin Panel
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ImagesList;
