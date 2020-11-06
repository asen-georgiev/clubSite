import React, {Component} from 'react';
import Joi from "joi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {toast} from "react-toastify";
import {FormLabel} from "react-bootstrap";
import {getEventCalendar, updateEventCalendar} from "../services/eventService";

class UpdateEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {
                eventTitle: '',
                eventInfo: '',
                eventLocation: '',
                eventDate: '',
                eventLink: ''
            },
            errors: {},
            isDisabled: false
        }
    }

    schema = Joi.object({
        _id: Joi.string(),
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


    async componentDidMount() {
        await this.populateEvent();
        console.log(this.state.event);
    }


    async populateEvent() {
        try {
            const eventId = this.props.match.params.id;
            const {data: event} = await getEventCalendar(eventId);
            this.setState({event: this.mapToViewModel(event)});
        } catch (e) {
            if (e.response && e.response.status === 404)
                console.log('There is no Event with this ID!');
        }
    }


    handleChange = (e) => {
        const event = {...this.state.event};
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        event[name] = value;
        this.setState({event});
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        const obj = {
            eventTitle: this.state.event.eventTitle,
            eventInfo: this.state.event.eventInfo,
            eventDate: this.state.event.eventDate,
            eventLocation: this.state.event.eventLocation,
            eventLink: this.state.event.eventLink
        }

        this.setState({isDisabled: true});
        toast.success('Event update was successful!');
        await updateEventCalendar(obj, this.state.event._id)
    }


    validate = () => {
        const obj = {
            eventTitle: this.state.event.eventTitle,
            eventInfo: this.state.event.eventInfo,
            eventDate: this.state.event.eventDate,
            eventLocation: this.state.event.eventLocation,
            eventLink: this.state.event.eventLink
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


    mapToViewModel(event) {
        return {
            _id: event._id,
            eventTitle: event.eventTitle,
            eventInfo: event.eventInfo,
            eventDate: event.eventDate,
            eventLocation: event.eventLocation,
            eventLink: event.eventLink
        };
    }


    adminRedirect = () => {
        this.props.history.push("/admin/eventslist");
    }


    render() {
        return (
            <div>
                <Container className="container bg-secondary" fluid={true}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <FormLabel>
                                Event Title
                            </FormLabel>
                            <FormControl
                                autoFocus={true}
                                name="eventTitle"
                                type="text"
                                value={this.state.event.eventTitle}
                                placeholder="Enter the title of the event"
                                onChange={this.handleChange}/>
                            {this.state.errors.eventTitle &&
                            <p className="text-danger pt-2">
                                {this.state.errors.eventTitle}
                            </p>}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Event Info
                            </FormLabel>
                            <FormControl
                                name="eventInfo"
                                as="textarea"
                                rows="3"
                                value={this.state.event.eventInfo}
                                placeholder="Enter information about the event"
                                onChange={this.handleChange}/>
                            {this.state.errors.eventInfo &&
                            <p className="text-danger pt-2">
                                {this.state.errors.eventInfo}
                            </p>}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Event Date
                            </FormLabel>
                            <FormControl
                                name="eventDate"
                                type="text"
                                value={this.state.event.eventDate}
                                placeholder="Enter the date of the event"
                                onChange={this.handleChange}/>
                            {this.state.errors.eventDate &&
                            <p className="text-danger pt-2">
                                {this.state.errors.eventDate}
                            </p>}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Event Location
                            </FormLabel>
                            <FormControl
                                name="eventLocation"
                                type="text"
                                value={this.state.event.eventLocation}
                                placeholder="Enter the location of the event"
                                onChange={this.handleChange}/>
                            {this.state.errors.eventLocation &&
                            <p className="text-danger pt-2">
                                {this.state.errors.eventLocation}
                            </p>}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Event Link
                            </FormLabel>
                            <FormControl
                                name="eventLink"
                                type="text"
                                value={this.state.event.eventLink}
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
                                    Update
                                </Button>
                            </Col>
                            <Col md={{span: 4, offset: 4}}>
                                <Button variant="primary" onClick={this.adminRedirect}>
                                    Back to Events list
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default UpdateEventForm;
