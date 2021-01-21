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
import {registerUser} from "../../services/userService";
import {FormLabel} from "react-bootstrap";
import FormCheck from "react-bootstrap/FormCheck";
import '../../css/admin.css';
import Card from "react-bootstrap/Card";


class RegisterUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            isAdmin: false,
            errors: {},
            isDisabled: true
        }
    };

    schema = Joi.object({
        name: Joi.string()
            .required()
            .min(5)
            .max(50)
            .label("Full name"),
        email: Joi.string()
            .required()
            .min(8)
            .max(50)
            .label("Email"),
        password: Joi.string()
            .required()
            .min(8)
            .max(255)
            .label("Password"),
        isAdmin: Joi.boolean()
            .label("isAdmin")
    });


    handleChange = (event) => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
            isDisabled: false
        });
    };

    validate = () => {
        const obj = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            isAdmin: this.state.isAdmin
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


    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;
        this.setState({isDisabled: true});
        const obj = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            isAdmin: this.state.isAdmin
        };
        await registerUser(obj);
        // this.props.history.push("/admin");
        toast.success('User registration was successful!');
    }

    adminRedirect = () => {
        this.props.history.push("/admin")
    }


    render() {
        return (
            <div>
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>Register new User form :</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Body>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup className="pt-3">
                                            <FormLabel>
                                                {/*Full Name*/}
                                            </FormLabel>
                                            <FormControl
                                                className="admin-form-control"
                                                autoFocus={true}
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={this.state.name}
                                                placeholder="Enter user's name"
                                                onChange={this.handleChange}/>
                                            {this.state.errors.name &&
                                            <p className="text-danger pt-2">
                                                {this.state.errors.name}
                                            </p>}
                                        </FormGroup>
                                        <FormGroup className="pt-3">
                                            <FormLabel>
                                                {/*Email*/}
                                            </FormLabel>
                                            <FormControl
                                                className="admin-form-control"
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={this.state.email}
                                                placeholder="Enter user's email"
                                                onChange={this.handleChange}/>
                                            {this.state.errors.email &&
                                            <p className="text-danger pt-2">
                                                {this.state.errors.email}
                                            </p>}
                                        </FormGroup>
                                        <FormGroup className="pt-3">
                                            <FormLabel>
                                                {/*Password*/}
                                            </FormLabel>
                                            <FormControl
                                                className="admin-form-control"
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={this.state.password}
                                                placeholder="Enter user's password"
                                                onChange={this.handleChange}/>
                                            {this.state.errors.password &&
                                            <p className="text-danger pt-2">
                                                {this.state.errors.password}
                                            </p>}
                                        </FormGroup>
                                        <FormGroup className="pt-3">
                                            <FormCheck
                                                className="admin-form-control"
                                                id="isAdmin"
                                                name="isAdmin"
                                                type="checkbox"
                                                value={this.state.isAdmin}
                                                label="User will have admin rights"
                                                onChange={this.handleChange}/>
                                        </FormGroup>
                                        <Row>
                                            <Col md={4}>
                                                <Button type="submit"
                                                        className="admin-button-submit"
                                                        disabled={this.state.isDisabled}>
                                                    REGISTER
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

export default RegisterUserForm;
