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
import {createCourse} from "../../services/courseService";

class CreateCourseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseName: '',
            courseInfo: '',
            coursePrice: '',
            courseAge: '',
            errors: {},
            isDisabled: true
        }
    }

    schema = Joi.object({
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


    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        console.log(errors);
        if (errors) return;

        this.setState({isDisabled: true});

        const obj = {
            courseName: this.state.courseName,
            courseInfo: this.state.courseInfo,
            coursePrice: this.state.coursePrice,
            courseAge: this.state.courseAge
        }
        await createCourse(obj);
        toast.success('New course was created successfully!');
    }


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
            courseName: this.state.courseName,
            courseInfo: this.state.courseInfo,
            coursePrice: this.state.coursePrice,
            courseAge: this.state.courseAge
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

    adminRedirect = () => {
        this.props.history.push("/admin");
    }

    render() {
        return (
            <div>
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col style={{marginBottom: 27}}>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>Create Course Form :</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Body>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <FormLabel>
                                                {/*Course name*/}
                                            </FormLabel>
                                            <FormControl
                                                className="admin-form-control"
                                                autoFocus={true}
                                                name="courseName"
                                                type="text"
                                                value={this.state.courseName}
                                                placeholder="Enter the course name"
                                                onChange={this.handleChange}
                                            />
                                            {this.state.errors.courseName &&
                                            <p className="text-danger pt-2">
                                                {this.state.errors.courseName}
                                            </p>}
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>
                                                {/*Course info*/}
                                            </FormLabel>
                                            <FormControl
                                                className="admin-form-control"
                                                name="courseInfo"
                                                as="textarea"
                                                rows="3"
                                                value={this.state.courseInfo}
                                                placeholder="Enter info for the course"
                                                onChange={this.handleChange}
                                            />
                                            {this.state.errors.courseInfo &&
                                            <p className="text-danger pt-2">
                                                {this.state.errors.courseInfo}
                                            </p>}
                                        </FormGroup>
                                        <Row className="mb-4">
                                            <Col>
                                                <FormGroup>
                                                    <FormLabel>
                                                        {/*Course price*/}
                                                    </FormLabel>
                                                    <FormControl
                                                        className="admin-form-control"
                                                        name="coursePrice"
                                                        type="text"
                                                        value={this.state.coursePrice}
                                                        placeholder="Enter price for the course"
                                                        onChange={this.handleChange}
                                                    />
                                                    {this.state.errors.coursePrice &&
                                                    <p className="text-danger pt-2">
                                                        {this.state.errors.coursePrice}
                                                    </p>}
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <FormLabel>
                                                        {/*Course age range*/}
                                                    </FormLabel>
                                                    <FormControl
                                                        className="admin-form-control"
                                                        name="courseAge"
                                                        type="text"
                                                        value={this.state.courseAge}
                                                        placeholder="Enter age range for the course"
                                                        onChange={this.handleChange}
                                                    />
                                                    {this.state.errors.courseAge &&
                                                    <p className="text-danger pt-2">
                                                        {this.state.errors.courseAge}
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

export default CreateCourseForm;
