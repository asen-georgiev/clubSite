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
import {picturesUrl} from "../../config.json";
import {getNew, updateNew} from "../../services/newsService";
import {uploadImage} from "../../services/imageService";
import Card from "react-bootstrap/Card";
import '../../css/admin.css';


const picUrl = process.env.REACT_APP_PICTURES_URL;

class UpdateNewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anew: {
                title: '',
                text: '',
                linkTo: '',
                pictureName: '',
                newsDate: ''
            },
            showedPicture: null,
            uploadedPicture: '',
            errors: {},
            isDisabled: true
        }
    }

    schema = Joi.object({
        _id: Joi.string(),
        title: Joi.string()
            .required()
            .min(5)
            .max(100)
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
            pictureName: this.state.anew.pictureName,
            newsDate: this.state.anew.newsDate
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
        this.setState({
            anew,
            isDisabled:false
        });
    }

    handlePicture = (event) =>{
        const anew = {...this.state.anew};
        const target = event.target;
        const value = event.target.files[0].name;
        const name = target.name;
        anew[name] = value;
        this.setState({
            anew,
            showedPicture: URL.createObjectURL(event.target.files[0]),
            uploadedPicture: event.target.files[0]
        });
    }

    mapToViewModel(anew) {
        return {
            _id: anew._id,
            title: anew.title,
            text: anew.text,
            linkTo: anew.linkTo,
            pictureName: anew.pictureName,
            newsDate: anew.newsDate
        };
    }


    validate = () => {
        const obj = {
            title: this.state.anew.title,
            text: this.state.anew.text,
            linkTo: this.state.anew.linkTo,
            pictureName: this.state.anew.pictureName,
            newsDate: this.state.anew.newsDate
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
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                    <Col>
                        <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                            <h3>Update News Form :</h3>
                        </Row>
                        <Card className="admin-maincard">
                            <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <FormLabel>
                                Title
                            </FormLabel>
                            <FormControl
                                className="admin-form-control"
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
                                className="admin-form-control"
                                name="text"
                                as="textarea"
                                rows="5"
                                value={this.state.anew.text}
                                placeholder="Enter news text"
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <Row className="mb-5">
                            <Col>
                        <FormGroup>
                            <FormLabel>
                                Link
                            </FormLabel>
                            <FormControl
                                className="admin-form-control"
                                name="linkTo"
                                type="text"
                                value={this.state.anew.linkTo}
                                placeholder="Enter news link"
                                onChange={this.handleChange}/>
                        </FormGroup>
                            </Col>
                            <Col>
                        <FormGroup>
                            <FormLabel>
                                News Date
                            </FormLabel>
                            <FormControl
                                className="admin-form-control"
                                name="newsDate"
                                type="text"
                                value={this.state.anew.newsDate}
                                placeholder="Enter news date"
                                onChange={this.handleChange}/>
                            {this.state.errors.newsDate &&
                            <p className="text-danger pt-2">
                                {this.state.errors.newsDate}
                            </p>}
                        </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Form.File
                                className="admin-form-control"
                                id="image"
                                name="pictureName"
                                label="Change the image for the News"
                                onChange={this.handlePicture}
                            />
                        </FormGroup>
                            {this.state.showedPicture === null &&
                            <Col>
                                <h5>Current picture:</h5>
                                <Image src={picUrl + this.state.anew.pictureName}
                                       width="300"
                                       height="auto"/>
                            </Col>
                            }
                            {this.state.showedPicture &&
                            <Col>
                                <h5>Updated picture:</h5>
                                <Image src={this.state.showedPicture}
                                       width="300"
                                       height="auto"/>
                            </Col>
                            }
                        <Row className="mt-3">
                            <Col md={4}>
                                <Button
                                    className="admin-button-submit"
                                    type="submit"
                                    disabled={this.state.isDisabled}>
                                   UPDATE
                                </Button>
                            </Col>
                            <Col md={{span: 4, offset: 4}} className="d-flex flex-row-reverse">
                                <Button
                                    className="admin-button-update"
                                    onClick={this.adminRedirect}>
                                   BACK TO NEWS LIST
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

export default UpdateNewForm;
