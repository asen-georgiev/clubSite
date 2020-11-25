import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import {uploadImage} from "../../services/imageService";
import {toast} from "react-toastify";
import {Image} from "react-bootstrap";
import '../../css/admin.css';
import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/CardImg";
import FormLabel from "react-bootstrap/FormLabel";



class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            showedFile:null,
            isDisabled: true
        }
    }

    onChangeHandler = (event) => {
        this.setState({
            showedFile:  URL.createObjectURL(event.target.files[0]),
            selectedFile: event.target.files[0],
            isDisabled: false
        })
    }

    onClickHandler = async () => {
        const data = new FormData();
        data.append('file', this.state.selectedFile);
        await uploadImage(data);
        if(this.state.selectedFile===null){
            toast.error('You must select image to upload');
            return;
        }
        toast.success('The image is uploaded successfully!');
        console.log(data);
        console.log(this.state.showedFile);
    }

    adminRedirect = () => {
        this.props.history.push("/admin")
    }


    render() {
        return (
            <div>
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col style={{marginBottom: 180}}>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>Upload image to Gallery :</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Header>
                                    {this.state.selectedFile === null &&
                                    <span>There is no selected image</span>}
                                    {this.state.selectedFile !== null &&
                                    <span>Picture name : {this.state.selectedFile.name}</span>}
                                </Card.Header>
                                <Card.Body>
                <Form>
                    <FormGroup>
                        <FormLabel htmlFor="image">
                            Upload from your compurer:
                        </FormLabel>
                        <Form.File
                            type="file"
                            id="image"
                            name="image"
                            // label="Upload from your computer : "
                            onChange={this.onChangeHandler}
                        />
                    </FormGroup>
                    <CardImg
                        src={this.state.showedFile}
                    />
                    <Row className="mt-3">
                        <Col md={4}>
                            <Button
                                type="button"
                                className="admin-button-update"
                                disabled={this.state.isDisabled}
                                onClick={this.onClickHandler}>
                                UPLOAD
                            </Button>
                        </Col>
                        <Col md={{span: 4, offset: 4}} className="d-flex flex-row-reverse">
                            <Button
                                className="admin-button-update"
                                onClick={this.adminRedirect}>
                                BACK TO ADMIN PANEL
                            </Button>
                        </Col>
                    </Row>
                </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ImageUpload;
