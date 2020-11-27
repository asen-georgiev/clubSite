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
import {FormLabel} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import '../../css/admin.css';
import {createClubBio} from "../../services/clubbioService";


class CreateClubBioForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bioTitle: '',
            bioText: '',
            errors: {},
            isDisabled: true
        }
    }


    schema = Joi.object({
        bioTitle: Joi.string()
            .required()
            .min(5)
            .max(50)
            .label('BioTitle'),
        bioText: Joi.string()
            .required()
            .min(5)
            .label('BioText')
    })


    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            isDisabled: false
        });
    }


    validate = () => {
        const obj = {
            bioTitle: this.state.bioTitle,
            bioText: this.state.bioText
        }
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

        const obj = {
            bioTitle: this.state.bioTitle,
            bioText: this.state.bioText
        }
        await createClubBio(obj);
        toast.success('New club biography was successfully created!');
    }


    adminRedirect = () => {
        this.props.history.push("/admin");
    }


    render() {
        return (
            <div>
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>Create Club biography Form :</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Body>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <FormLabel>
                                                {/*Club Bio Title*/}
                                            </FormLabel>
                                            <FormControl
                                                className="admin-form-control"
                                                autoFocus={true}
                                                name="bioTitle"
                                                type="text"
                                                placeholder="Enter the title for the club biography"
                                                onChange={this.handleChange}/>
                                            {this.state.errors.bioTitle &&
                                            <p className="text-danger pt-2">
                                                {this.state.errors.bioTitle}
                                            </p>}
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>
                                                {/*Club Bio Text*/}
                                            </FormLabel>
                                            <FormControl
                                                className="admin-form-control"
                                                name="bioText"
                                                as="textarea"
                                                rows="8"
                                                placeholder="Enter the text for the club biography"
                                                onChange={this.handleChange}/>
                                            {this.state.errors.bioText &&
                                            <p className="text-danger pt-2">
                                                {this.state.errors.bioText}
                                            </p>}
                                        </FormGroup>
                                        <Row className="mt-5">
                                            <Col md={4}>
                                                <Button
                                                    className="admin-button-submit"
                                                    type="submit"
                                                    disabled={this.state.isDisabled}>
                                                    SUBMIT
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

export default CreateClubBioForm;
