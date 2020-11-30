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
            isDisabled: true,
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
            [name]: value,
            isDisabled: false
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


    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
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
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col style={{marginBottom: 175}}>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 110}}>
                                <h3>Create Timetable Form :</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Body>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Row className="mb-3">
                                            <FormGroup as={Col}>
                                                <FormLabel htmlFor="courseControl">
                                                    {/*Course*/}
                                                </FormLabel>
                                                <FormControl
                                                    className="admin-form-control"
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
                                                {this.state.errors.courseId &&
                                                <p className="text-danger pt-2">
                                                    {this.state.errors.courseId}
                                                </p>}
                                            </FormGroup>
                                            <FormGroup as={Col}>
                                                <FormLabel htmlFor="timedhControl">
                                                    {/*Time:day/hour*/}
                                                </FormLabel>
                                                <FormControl
                                                    className="admin-form-control"
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
                                                {this.state.errors.timedhId &&
                                                <p className="text-danger pt-2">
                                                    {this.state.errors.timedhId}
                                                </p>}
                                            </FormGroup>
                                        </Form.Row>
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

export default CreateTimeTableForm;
