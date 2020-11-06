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
import {createSchedule} from "../../services/scheduleService";

class CreateScheduleForm extends Component {
    constructor(props) {
        super(props);
        this.state={
           classDay:'',
           classHour:'',
           classClass:'',
           classAge:'',
           errors:{},
           isDisabled:false
        }
    }

    schema = Joi.object({
        classDay: Joi.string()
            .required()
            .min(1)
            .max(15)
            .label("ClassDay"),
       classHour: Joi.string()
            .required()
            .min(1)
            .max(50)
            .label("ClassHour"),
        classClass: Joi.string()
            .min(1)
            .max(50)
            .label("ClassClass")
            .allow(''),
        classAge: Joi.string()
            .required()
            .min(1)
            .max(50)
            .label('ClassAge')
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
            classDay: this.state.classDay,
            classHour: this.state.classHour,
            classClass: this.state.classClass,
            classAge: this.state.classAge
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
        if(errors) return;

        this.setState({isDisabled: true});

        const obj = {
            classDay: this.state.classDay,
            classHour: this.state.classHour,
            classClass: this.state.classClass,
            classAge: this.state.classAge
        }

        await createSchedule(obj);
        toast.success('New schedule was created successfully!');
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
                                Class Day
                            </FormLabel>
                            <FormControl
                            autoFocus={true}
                            name="classDay"
                            type="text"
                            value={this.state.classDay}
                            placeholder="Enter the day for the class"
                            onChange={this.handleChange}
                            />
                            {this.state.errors.classDay &&
                            <p className="text-danger pt-2">
                                {this.state.errors.classDay}
                            </p>}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Class Hour
                            </FormLabel>
                            <FormControl
                                name="classHour"
                                type="text"
                                value={this.state.classHour}
                                placeholder="Enter the hour for the class"
                                onChange={this.handleChange}
                            />
                            {this.state.errors.classHour &&
                            <p className="text-danger pt-2">
                                {this.state.errors.classHour}
                            </p>}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Class Name
                            </FormLabel>
                            <FormControl
                                name="classClass"
                                type="text"
                                value={this.state.classClass}
                                placeholder="Enter the name of the class"
                                onChange={this.handleChange}
                            />
                            {this.state.errors.classClass &&
                            <p className="text-danger pt-2">
                                {this.state.errors.classClass}
                            </p>}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Class Age
                            </FormLabel>
                            <FormControl
                                name="classAge"
                                type="text"
                                value={this.state.classAge}
                                placeholder="Enter the age group for the class"
                                onChange={this.handleChange}
                            />
                            {this.state.errors.classAge &&
                            <p className="text-danger pt-2">
                                {this.state.errors.classAge}
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

export default CreateScheduleForm;
