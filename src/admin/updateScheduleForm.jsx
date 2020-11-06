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
import {getSchedule, updateSchedule} from "../services/scheduleService";


class UpdateScheduleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule:{
                classDay:'',
                classHour:'',
                classClass:'',
                classAge:''
            },
            errors:{},
            isDisabled:false
        }
    }

    schema = Joi.object({
        _id: Joi.string(),
        classDay: Joi.string()
            .required()
            .min(1)
            .max(15)
            .label('ClassDay'),
        classHour: Joi.string()
            .required()
            .min(1)
            .max(50)
            .label('ClassHour'),
        classClass: Joi.string()
            .required()
            .min(1)
            .max(50)
            .label('ClassClass'),
        classAge: Joi.string()
            .required()
            .min(1)
            .max(50)
            .label('ClassAge')
    });



    async componentDidMount() {
        await this.populateSchedule();
        console.log(this.state.schedule);
    }



    async populateSchedule() {
        try{
            const scheduleId = this.props.match.params.id;
            const {data: schedule} = await getSchedule(scheduleId);
            this.setState({schedule: this.mapToViewModel(schedule)});
        }
        catch (e) {
            if(e.response && e.response === 404)
                console.log('There is no Schedule with the given ID');
        }
}



    mapToViewModel(schedule){
        return {
            _id: schedule._id,
            classDay: schedule.classDay,
            classHour: schedule.classHour,
            classClass: schedule.classClass,
            classAge: schedule.classAge
        };
    }



    handleSubmit = async(event) =>{
        event.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if(errors) return;

        const obj = {
            classDay: this.state.schedule.classDay,
            classHour: this.state.schedule.classHour,
            classClass: this.state.schedule.classClass,
            classAge: this.state.schedule.classAge
        };

        this.setState({isDisabled: true});
        toast.success('Schedule update was successful!');
        await updateSchedule(obj,this.state.schedule._id);
}


    handleChange = (event) =>{
        const schedule = {...this.state.schedule};
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        schedule[name] = value;
        this.setState({
            schedule
        })
    }



    validate= () =>{
        const obj = {
            classDay: this.state.schedule.classDay,
            classHour: this.state.schedule.classHour,
            classClass: this.state.schedule.classClass,
            classAge: this.state.schedule.classAge
        }
        const options = {abortEarly: false};
        const result = this.schema.validate(obj, options);
        console.log(result);

        if(!result.error) return null;
        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }



    adminRedirect = () => {
        this.props.history.push("/admin/scheduleslist");
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
                                value={this.state.schedule.classDay}
                                placeholder="Enter the day for the class"
                                onChange={this.handleChange}/>
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
                                value={this.state.schedule.classHour}
                                placeholder="Enter the hour for the class"
                                onChange={this.handleChange}/>
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
                                name="className"
                                type="text"
                                value={this.state.schedule.classClass}
                                placeholder="Enter the name of the class"
                                onChange={this.handleChange}/>
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
                                value={this.state.schedule.classAge}
                                placeholder="Enter the age group for the class"
                                onChange={this.handleChange}/>
                            {this.state.errors.classAge &&
                            <p className="text-danger pt-2">
                                {this.state.errors.classAge}
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
                                    Back to Schedules list
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default UpdateScheduleForm;
