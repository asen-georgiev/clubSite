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
import {createEventCalendar} from "../../services/eventService";

class CreateEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventTitle: '',
            eventInfo: '',
            eventDate: '',
            eventLocation: '',
            eventLink: '',
            errors: {},
            isDisabled: true
        }
    }

    schema = Joi.object({
        eventTitle: Joi.string()
            .required()
            .min(5)
            .max(50)
            .label("EventTitle"),
        eventInfo: Joi.string()
            .required()
            .min(5)
            .max(500)
            .label("EventInfo"),
        eventDate: Joi.string()
            .required()
            .min(5)
            .max(50)
            .label("EventDate"),
        eventLocation: Joi.string()
            .required()
            .min(5)
            .max(50)
            .label("EventLocation"),
        eventLink: Joi.string()
            .min(5)
            .max(50)
            .allow('')
            .label("EventLink")
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
            eventTitle: this.state.eventTitle,
            eventInfo: this.state.eventInfo,
            eventDate: this.state.eventDate,
            eventLocation: this.state.eventLocation,
            eventLink: this.state.eventLink
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
            eventTitle: this.state.eventTitle,
            eventInfo: this.state.eventInfo,
            eventDate: this.state.eventDate,
            eventLocation: this.state.eventLocation,
            eventLink: this.state.eventLink
        }
        await createEventCalendar(obj);
        toast.success('The event was successfully created!');
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
                                <h3>Create Sport event Form :</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Body>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <FormLabel>
                                                {/*Event Title*/}
                                            </FormLabel>
                                            <FormControl
                                                className="admin-form-control"
                                                autoFocus={true}
                                                name="eventTitle"
                                                type="text"
                                                value={this.state.eventTitle}
                                                placeholder="Enter the title of the event"
                                                onChange={this.handleChange}/>
                                            {this.state.errors.eventTitle &&
                                            <p className="text-danger pt-2">
                                                {this.state.errors.eventTitle}
                                            </p>}
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>
                                                {/*Event Info*/}
                                            </FormLabel>
                                            <FormControl
                                                className="admin-form-control"
                                                name="eventInfo"
                                                as="textarea"
                                                rows="3"
                                                value={this.state.eventInfo}
                                                placeholder="Enter information about the event"
                                                onChange={this.handleChange}/>
                                            {this.state.errors.eventInfo &&
                                            <p className="text-danger pt-2">
                                                {this.state.errors.eventInfo}
                                            </p>}
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>
                                                {/*Event Location*/}
                                            </FormLabel>
                                            <FormControl
                                                className="admin-form-control"
                                                name="eventLocation"
                                                type="text"
                                                value={this.state.eventLocation}
                                                placeholder="Enter the location of the event"
                                                onChange={this.handleChange}/>
                                            {this.state.errors.eventLocation &&
                                            <p className="text-danger pt-2">
                                                {this.state.errors.eventLocation}
                                            </p>}
                                        </FormGroup>
                                        <Row className="mb-4">
                                            <Col>
                                                <FormGroup>
                                                    <FormLabel>
                                                        {/*Event Date*/}
                                                    </FormLabel>
                                                    <FormControl
                                                        className="admin-form-control"
                                                        name="eventDate"
                                                        type="text"
                                                        value={this.state.eventDate}
                                                        placeholder="Enter the date of the event"
                                                        onChange={this.handleChange}/>
                                                    {this.state.errors.eventDate &&
                                                    <p className="text-danger pt-2">
                                                        {this.state.errors.eventDate}
                                                    </p>}
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <FormLabel>
                                                        {/*Event Link*/}
                                                    </FormLabel>
                                                    <FormControl
                                                        className="admin-form-control"
                                                        name="eventLink"
                                                        type="text"
                                                        value={this.state.eventLink}
                                                        placeholder="Enter link to additional information"
                                                        onChange={this.handleChange}/>
                                                    {this.state.errors.eventLink &&
                                                    <p className="text-danger pt-2">
                                                        {this.state.errors.eventLink}
                                                    </p>}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
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

export default CreateEventForm;
