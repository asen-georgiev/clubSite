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
import {getNew, updateNew} from "../services/newsService";
import {uploadImage} from "../services/imageService";


class UpdateNewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anew: {
                title: '',
                text: '',
                linkTo: '',
                pictureName: ''
            },
            showedPicture: '',
            uploadedPicture: '',
            errors: {},
            isDisabled: false
        }
    }

    schema = Joi.object({
        _id: Joi.string(),
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
            .label('PictureName')

    })


    async componentDidMount() {
        await this.populateNew();
        console.log(this.state.anew);
    }

    async populateNew() {
        try {
            const anewId = this.props.match.params.id;
            const {data: anew} = await getNew(anewId);
            this.setState({anew: this.mapToViewModel(anew)});
        } catch (e) {
            if (e.response && e.response === 404)
                console.log('There is no News with the given ID');
        }
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

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
            title: this.state.anew.title,
            text: this.state.anew.text,
            linkTo: this.state.anew.linkTo,
            pictureName: this.state.anew.pictureName
        };

        this.setState({isDisabled: true});
        toast.success('News update was successful!');
        await updateNew(obj, this.state.anew._id);
    }

    handleChange = (event) => {
        const anew = {...this.state.anew};
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        anew[name] = value;
        anew["pictureName"] = event.target.files[0].name;
        this.setState({
            anew,
            showedPicture: URL.createObjectURL(event.target.files[0]),
            uploadedPicture: event.target.files[0],
        })
    }


    mapToViewModel(anew) {
        return {
            _id: anew._id,
            title: anew.title,
            text: anew.text,
            linkTo: anew.linkTo,
            pictureName: anew.pictureName
        };
    }


    validate = () => {
        const obj = {
            title: this.state.anew.title,
            text: this.state.anew.text,
            linkTo: this.state.anew.linkTo,
            pictureName: this.state.anew.pictureName
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


    adminRedirect = () => {
        this.props.history.push("/admin/newslist");
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
                                value={this.state.anew.title}
                                placeholder="Enter news title"
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Text
                            </FormLabel>
                            <FormControl
                                name="text"
                                as="textarea"
                                rows="5"
                                value={this.state.anew.text}
                                placeholder="Enter news text"
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Link
                            </FormLabel>
                            <FormControl
                                name="linkTo"
                                type="text"
                                value={this.state.anew.linkTo}
                                placeholder="Enter news link"
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Form.File
                                id="image"
                                name="image"
                                label="Change the image for the News"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <Row>
                            {this.state.anew.pictureName &&
                            <Col>
                                <h4>Current picture:</h4>
                                <Image src={"http://localhost:3900/" + this.state.anew.pictureName}
                                       width="200"
                                       height="auto"/>
                            </Col>
                            }
                        </Row>
                        <br/>
                        <Row>
                            <Col md={4}>
                                <Button variant="primary" type="submit" disabled={this.state.isDisabled}>
                                    Update
                                </Button>
                            </Col>
                            <Col md={{span: 4, offset: 4}}>
                                <Button variant="primary" onClick={this.adminRedirect}>
                                    Back to News list
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default UpdateNewForm;
