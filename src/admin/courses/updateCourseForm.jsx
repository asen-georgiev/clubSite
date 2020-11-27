import React, {Component} from 'react';
import Joi from "joi";
import {getCourse, updateCourse} from "../../services/courseService";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import {FormLabel} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {toast} from "react-toastify";
import Card from "react-bootstrap/Card";
import '../../css/admin.css';

class UpdateCourseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course:{
                courseName:"",
                courseInfo:"",
                coursePrice:"",
                courseAge:""
            },
            errors:{},
            isDisabled:true
        }
    }

    schema = Joi.object({
        _id: Joi.string(),
        courseName: Joi.string()
            .required()
            .min(3)
            .max(50)
            .label('CourseName'),
        courseInfo: Joi.string()
            .required()
            .min(5)
            .max(255)
            .label('CourseInfo'),
        coursePrice: Joi.number()
            .required()
            .min(1)
            .label('CoursePrice'),
        courseAge: Joi.string()
            .required()
            .min(2)
            .max(20)
            .label('CourseAge')
    });


    async componentDidMount() {
        await this.populateCourse();
        console.log(this.state.course)
    }


    handleChange = (event) =>{
        const course = {...this.state.course};
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        course[name] = value;
        this.setState({
            course,
            isDisabled:false
        });
    }




    validate = () =>{
        const obj = {
            courseName: this.state.course.courseName,
            courseInfo: this.state.course.courseInfo,
            coursePrice: this.state.course.coursePrice,
            courseAge: this.state.course.courseAge
        };
        const options = {abortEarly:false};
        const result = this.schema.validate(obj,options);
        console.log(result);

        if (!result.error) return null;
        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }


    handleSubmit = async (event) =>{
        event.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        const obj = {
            courseName: this.state.course.courseName,
            courseInfo: this.state.course.courseInfo,
            coursePrice: this.state.course.coursePrice,
            courseAge: this.state.course.courseAge
        };

        this.setState({isDisabled: true});
        toast.success('Course update was successful!');
        await updateCourse(obj, this.state.course._id);
    }



    async populateCourse(){
        try{
            const courseId = this.props.match.params.id;
            const{data: course} = await getCourse(courseId);
            this.setState({course: this.mapToViewModel(course)});
        }
        catch (e) {
            if (e.response && e.response.status === 404)
                console.log('There is no Course with this ID!');
        }
    }


    mapToViewModel(course){
        return {
            _id: course._id,
            courseName: course.courseName,
            courseInfo: course.courseInfo,
            coursePrice: course.coursePrice,
            courseAge: course.courseAge
        };
    }


    adminRedirect = () => {
        this.props.history.push("/admin/courseslist");
    }


    render() {
        return (
            <div>
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col style={{marginBottom: 11}}>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>Update Course Form :</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <FormLabel>
                                Course name
                            </FormLabel>
                            <FormControl
                                className="admin-form-control"
                                autofocus={true}
                                name="courseName"
                                type="text"
                                value={this.state.course.courseName}
                                placeholder="Enter the course name"
                                onChange={this.handleChange}
                            />
                            {this.state.errors.courseName &&
                            <div className="alert alert-danger">
                                {this.state.errors.courseName}
                            </div>}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Course info
                            </FormLabel>
                            <FormControl
                                className="admin-form-control"
                                name="courseInfo"
                                as="textarea"
                                rows="3"
                                value={this.state.course.courseInfo}
                                placeholder="Enter info for the course"
                                onChange={this.handleChange}
                            />
                            {this.state.errors.courseInfo &&
                            <div className="alert alert-danger">
                                {this.state.errors.courseInfo}
                            </div>}
                        </FormGroup>
                        <Row className="mb-4">
                            <Col>
                        <FormGroup>
                            <FormLabel>
                                Course price
                            </FormLabel>
                            <FormControl
                                className="admin-form-control"
                                name="coursePrice"
                                type="text"
                                value={this.state.course.coursePrice}
                                placeholder="Enter price for the course"
                                onChange={this.handleChange}
                            />
                            {this.state.errors.coursePrice &&
                            <div className="alert alert-danger">
                                {this.state.errors.coursePrice}
                            </div>}
                        </FormGroup>
                            </Col>
                            <Col>
                        <FormGroup>
                            <FormLabel>
                                Course age range
                            </FormLabel>
                            <FormControl
                                className="admin-form-control"
                                name="courseAge"
                                type="text"
                                value={this.state.course.courseAge}
                                placeholder="Enter age range for the course"
                                onChange={this.handleChange}
                            />
                            {this.state.errors.courseAge &&
                            <div className="alert alert-danger">
                                {this.state.errors.courseAge}
                            </div>}
                        </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Button
                                    className="admin-button-submit"
                                    type="submit"
                                    disabled={this.state.isDisabled}>
                                   UPDATE
                                </Button>
                            </Col>
                            <Col md={{span: 4, offset: 4}} className="d-flex flex-row-reverse">
                                <Button
                                    className="admin-button-update"
                                    onClick={this.adminRedirect}>
                                    BACK TO COURSES LIST
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

export default UpdateCourseForm;
