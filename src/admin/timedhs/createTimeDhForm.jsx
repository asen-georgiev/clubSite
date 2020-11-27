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
import {createTimeDH} from "../../services/timedhService";
import Card from "react-bootstrap/Card";
import '../../css/admin.css';


class CreateTimeDhForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: '',
            hour: '',
            errors: {},
            isDisabled: true
        }
    }


    schema = Joi.object({
        day: Joi.string()
            .required()
            .min(5)
            .max(20),
        hour: Joi.string()
            .required()
            .min(2)
            .max(20)
    });


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
            day: this.state.day,
            hour: this.state.hour
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

        this.setState({isDisabled: true});

        const obj = {
            day: this.state.day,
            hour: this.state.hour
        }

        await createTimeDH(obj);
        toast.success('New Time:day/hour was created!');
    }


    adminRedirect = () => {
        this.props.history.push("/admin");
    }

    render() {
        return (
            <div>
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col style={{marginBottom: 200}}>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 85}}>
                                <h3>Create Day / Hour Form :</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Body>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Row className="mb-3">
                                            <Col>
                                                <FormGroup>
                                                    <FormLabel>
                                                        {/*Course Day*/}
                                                    </FormLabel>
                                                    <FormControl
                                                        className="admin-form-control"
                                                        autoFocus={true}
                                                        name="day"
                                                        type="text"
                                                        value={this.state.day}
                                                        placeholder="Enter the day for the course"
                                                        onChange={this.handleChange}/>
                                                    {this.state.errors.day &&
                                                    <p className="text-danger pt-2">
                                                        {this.state.errors.day}
                                                    </p>}
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <FormLabel>
                                                        {/*Course Hour*/}
                                                    </FormLabel>
                                                    <FormControl
                                                        className="admin-form-control"
                                                        name="hour"
                                                        type="text"
                                                        value={this.state.hour}
                                                        placeholder="Enter the hour for the course"
                                                        onChange={this.handleChange}/>
                                                    {this.state.errors.hour &&
                                                    <p className="text-danger pt-2">
                                                        {this.state.errors.hour}
                                                    </p>}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
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

export default CreateTimeDhForm;
