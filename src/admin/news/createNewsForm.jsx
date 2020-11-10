import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Joi from "joi";
import {toast} from "react-toastify";
import {FormLabel, Image} from "react-bootstrap";
import {createNews} from "../../services/newsService";
import {uploadImage} from "../../services/imageService";


class CreateNewsForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            linkTo: '',
            pictureName: '',
            newsDate: '',
            showedPicture: '',
            uploadedPicture: '',
            errors: {},
            isDisabled: false
        }
    };

    schema = Joi.object({
        title: Joi.string()
            .required()
            .min(5)
            .max(50)
            .label("Title"),
        text: Joi.string()
            .required()
            .min(10)
            .max(1024)
            .label("Text"),
        linkTo: Joi.string()
            .min(0)
            .max(255)
            .label("LinkTo")
            .allow(''),
        pictureName: Joi.string()
            .required()
            .min(5)
            .max(50)
            .label('PictureName'),
        newsDate: Joi.string()
            .min(6)
            .max(20)
            .allow('')

    })

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    validate = () => {
        const obj = {
            title: this.state.title,
            text: this.state.text,
            linkTo: this.state.linkTo,
            pictureName: this.state.pictureName,
            newsDate: this.state.newsDate
        };
        const options = {abortEarly: false};
        const result = this.schema.validate(obj, options);
        console.log(result);

        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        console.log(errors);
        if (errors) return;

        this.setState({isDisabled: true});

        const data = new FormData();
        data.append('file', this.state.uploadedPicture);
        await uploadImage(data);
        if (this.state.uploadedPicture === null) {
            toast.error('You must select image to upload!');
            return;
        }
        toast.success('The image is uploaded successfully!');
        console.log('Image was uploaded to gallery!');

        const obj = {
            title: this.state.title,
            text: this.state.text,
            linkTo: this.state.linkTo,
            pictureName: this.state.pictureName,
            newsDate: this.state.newsDate
        };

        await createNews(obj);
        toast.success('The news are created!');
    }


    onPictureHandler = (event) => {
        this.setState({
            showedPicture: URL.createObjectURL(event.target.files[0]),
            pictureName: event.target.files[0].name,
            uploadedPicture: event.target.files[0],
            loaded: 0,
            isDisabled: false
        })
    }

    adminRedirect = () => {
        this.props.history.push("/admin")
    }

    render() {
        return (
            <div>
                <Container className="container bg-secondary" fluid={true}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <FormLabel>
                                Title
                            </FormLabel>
                            <FormControl
                                autoFocus={true}
                                name="title"
                                type="text"
                                value={this.state.title}
                                placeholder="Enter news title"
                                onChange={this.handleChange}
                            />
                            {this.state.errors.title &&
                            <p className="text-danger pt-2">
                                {this.state.errors.title}
                            </p>}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Text
                            </FormLabel>
                            <FormControl
                                name="text"
                                as="textarea"
                                rows="5"
                                value={this.state.text}
                                placeholder="Enter news text"
                                onChange={this.handleChange}/>
                            {this.state.errors.text &&
                            <p className="text-danger pt-2">
                                {this.state.errors.text}
                            </p>}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Link
                            </FormLabel>
                            <FormControl
                                name="linkTo"
                                type="text"
                                value={this.state.linkTo}
                                placeholder="Enter news link"
                                onChange={this.handleChange}/>
                            {this.state.errors.linkTo &&
                            <p className="text-danger pt-2">
                                {this.state.errors.linkTo}
                            </p>}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                News Date
                            </FormLabel>
                            <FormControl
                                name="newsDate"
                                type="text"
                                value={this.state.newsDate}
                                placeholder="Enter news date"
                                onChange={this.handleChange}/>
                            {this.state.errors.newsDate &&
                            <p className="text-danger pt-2">
                                {this.state.errors.newsDate}
                            </p>}
                        </FormGroup>
                        <FormGroup>
                            <Form.File
                                id="image"
                                name="image"
                                label="Upload an image for the News"
                                onChange={this.onPictureHandler}
                            />
                        </FormGroup>
                        <Row>
                            <Col md={4}>
                                <Button variant="primary" type="submit" disabled={this.state.isDisabled}>
                                    Submit
                                </Button>
                            </Col>
                            <Col md={{span: 4, offset: 4}}>
                                <Button variant="primary" onClick={this.adminRedirect}>
                                    Back to Admin Panel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Image src={this.state.showedPicture} width="300" height="auto"/>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default CreateNewsForm;
