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
import {createEventCalendar} from "../services/eventService";

class CreateEventForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            eventTitle:'',
            eventInfo:'',
            eventDate:'',
            eventLocation:'',
            eventLink:'',
            errors:{},
            isDisabled:false
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
            .max(255)
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


    handleChange = (event) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    validate = () =>{
        const obj = {
            eventTitle: this.state.eventTitle,
            eventInfo: this.state.eventInfo,
            eventDate: this.state.eventDate,
            eventLocation: this.state.eventLocation,
            eventLink: this.state.eventLink
        }
        const options = {abortEarly:false};
        const result = this.schema.validate(obj,options);
        console.log(result);

        if(!result.error) return null;

        const errors = {};
        for(let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }


    handleSubmit = async(event) =>{
        event.preventDefault();
        const errors = this.validate();
        this.setState({errors:errors || {}});
        console.log(errors);
        if (errors) return;

        this.setState({isDisabled: true});

        this.setState({isDisabled: true});

        const obj={
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
        this.props.history.push("/admin")
    }

    render() {
        return (
            <div>
                <Container fluid={true}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <FormLabel>
                                Event Title
                            </FormLabel>
                            <FormControl
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
                            <FormLabel>
                                Event Info
                            </FormLabel>
                            <FormControl
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
                            <FormLabel>
                                Event Date
                            </FormLabel>
                            <FormControl
                                name="eventDate"
                                type="text"
                                value={this.state.eventDate}
                                placeholder="Enter the date of the event"
                                onChange={this.handleChange}/>
                            {this.state.errors.eventDate &&
                            <p className="text-danger pt-2">
                                {this.state.errors.eventDate}
                            </p>}
                            <FormLabel>
                                Event Location
                            </FormLabel>
                            <FormControl
                                name="eventLocation"
                                type="text"
                                value={this.state.eventLocation}
                                placeholder="Enter the location of the event"
                                onChange={this.handleChange}/>
                            {this.state.errors.eventLocation &&
                            <p className="text-danger pt-2">
                                {this.state.errors.eventLocation}
                            </p>}
                            <FormLabel>
                                Event Link
                            </FormLabel>
                            <FormControl
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
                        <Row>
                            <Col md={4}>
                                <Button variant="primary" type="submit" disabled={this.state.isDisabled}>
                                    Submit
                                </Button>
                            </Col>
                            <Col md={{span:4,offset:4}}>
                                <Button variant="primary" onClick={this.adminRedirect}>
                                    Back to Admin Panel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default CreateEventForm;
