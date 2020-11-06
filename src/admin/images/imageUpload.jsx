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
            loaded: 0,
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
                <Container className="container bg-secondary" fluid={true}>
                <Form>
                    <FormGroup>
                        <Form.File
                            id="image"
                            name="image"
                            label="Upload images from Computer"
                            onChange={this.onChangeHandler}
                        />
                    </FormGroup>
                    <Row>
                        <Col md={4}>
                            <Button
                                className="d-inline-block"
                                variant="success"
                                type="button"
                                disabled={this.state.isDisabled}
                                onClick={this.onClickHandler}>
                                Upload
                            </Button>
                        </Col>
                        <Col md={{span: 4, offset: 4}}>
                            <Button
                                className="d-inline-block"
                                variant="success"
                                type="button"
                                onClick={this.adminRedirect}>
                                Back to Admin Panel
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                <Image src={this.state.showedFile} width="300" height="auto"/>
                </Row>
                </Container>
            </div>
        );
    }
}

export default ImageUpload;
