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
import {getTimeTable, updateTimeTable} from "../../services/timetableService";


class UpdateTimeTableForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timetable: {
                course: '',
                timedh: ''
            },
            courses: [],
            timedhs: [],
            errors: {},
            isDisabled: false
        }
    }

    schema = Joi.object({
        _id: Joi.string(),
        courseId: Joi.string()
            .required()
            .label('Course'),
        timedhId: Joi.string()
            .required()
            .label('TimeDH')
    });


    async componentDidMount() {
        const {data: courses} = await getCourses();
        const {data: timedhs} = await getTimeDHs();
        await this.populateTimeTable();
        this.setState({courses, timedhs});
        console.log(this.state);
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        const obj = {
            courseId: this.state.timetable.courseId,
            timedhId: this.state.timetable.timedhId
        };

        this.setState({isDisabled: true});
        toast.success('Time table update was successfull!');
        await updateTimeTable(obj, this.state.timetable._id);
    }


    handleChange = (event) => {
        const timetable = {...this.state.timetable};
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        timetable[name] = value;
        this.setState({
            timetable
        });
    }


    async populateTimeTable() {
        try {
            const timetableId = this.props.match.params.id;
            const {data: timetable} = await getTimeTable(timetableId);
            this.setState({timetable: this.mapToViewModel(timetable)})
        } catch (e) {
            if (e.response && e.response === 404)
                console.log('There is no Time table with the given ID');
        }
    }


    mapToViewModel(timetable) {
        return {
            _id: timetable._id,
            courseId: timetable.course._id,
            timedhId: timetable.timedh._id,
            course: {
                _id: timetable.course._id,
                courseName: timetable.course.courseName,
                courseInfo: timetable.course.courseInfo,
                coursePrice: timetable.course.coursePrice
            },
            timedh: {
                _id: timetable.timedh._id,
                day: timetable.timedh.day,
                hour: timetable.timedh.hour
            }
        }
    }


    validate = () => {
        const obj = {
            courseId: this.state.timetable.courseId,
            hour: this.state.timetable.timedhId
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
        this.props.history.push("/admin/timetableslist");
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
                                    <option>
                                        current : {this.state.timetable.course.courseName}
                                    </option>
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
                                    <option>
                                        current : {this.state.timetable.timedh.day} : {this.state.timetable.timedh.hour}
                                    </option>
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
                                    Update
                                </Button>
                            </Col>
                            <Col md={{span: 4, offset: 4}}>
                                <Button variant="primary" onClick={this.adminRedirect}>
                                    Back to Time table list
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default UpdateTimeTableForm;
