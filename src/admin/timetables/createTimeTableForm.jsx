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
import {getCourses} from "../../services/courseService";
import {getTimeDHs} from "../../services/timedhService";
import {createTimeTable} from "../../services/timetableService";

class CreateTimeTableForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            timedhId: '',
            errors: {},
            isDisabled: false,
            courses: [],
            timedhs: []
        }
    }

    schema = Joi.object({
        courseId: Joi.string()
            .required()
            .label('Course'),
        timedhId: Joi.string()
            .required()
            .label('TimeDH')
    });


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
            courseId: this.state.courseId,
            timedhId: this.state.timedhId
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


    handleSubmit = async(event) => {
        event.preventDefault();
        const errors = this.validate();
        this.setState({errors:errors || {}});
        console.log(errors);

        this.setState({isDisabled: true});

        const obj = {
            courseId: this.state.courseId,
            timedhId: this.state.timedhId
        }

        await createTimeTable(obj);
        toast.success('Time table was created successfully!');
    }


    async componentDidMount() {
        const {data: courses} = await getCourses();
        const {data: timedhs} = await getTimeDHs();
        this.setState({
            courses,
            timedhs
        });
        console.log(this.state);
    }


    adminRedirect = () => {
        this.props.history.push("/admin");
    }


    render() {
        return (
            <div>
                <Container className="container bg-light" fluid={true}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <FormGroup as={Col}>
                                <FormLabel htmlFor="courseControl">
                                    Course
                                </FormLabel>
                                <FormControl
                                    as="select"
                                    id="courseControl"
                                    name="courseId"
                                    onChange={this.handleChange}>
                                    <option>Choose a course...</option>
                                    {this.state.courses.map(crs => {
                                        return (
                                            <option key={crs._id} value={crs._id}>
                                                {crs.courseName}
                                            </option>
                                        )
                                    })}
                                </FormControl>
                            </FormGroup>
                            <FormGroup as={Col}>
                                <FormLabel htmlFor="timedhControl">
                                    Time:day/hour
                                </FormLabel>
                                <FormControl
                                    as="select"
                                    id="timedhControl"
                                    name="timedhId"
                                    onChange={this.handleChange}>
                                    <option>Choose day and hour...</option>
                                    {this.state.timedhs.map(tdh => {
                                        return (
                                            <option key={tdh._id} value={tdh._id}>
                                                {tdh.day} : {tdh.hour}
                                            </option>
                                        )
                                    })}
                                </FormControl>
                            </FormGroup>
                        </Form.Row>
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
                </Container>
            </div>
        );
    }
}

export default CreateTimeTableForm;
