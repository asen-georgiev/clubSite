import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Joi from "joi";
import {toast} from "react-toastify";
import {loginUser, logout, getCurrentUser} from "../services/loginService";
import {getLoggedUser} from "../services/userService";


class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isDisabled: false,
            loggedUser: ''
        }
    };

    schema = Joi.object({
        email: Joi.string()
            .required()
            .min(5)
            .label("Email"),
        password: Joi.string()
            .required()
            .min(8)
            .max(255)
            .label("Password")
    });


    componentDidMount = async () => {
        const loggedUser = getCurrentUser();
        this.setState({loggedUser});
        console.log(loggedUser);
    }


    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };


    validate = () => {
        const obj = {email: this.state.email, password: this.state.password};
        const options = {abortEarly: false};
        const result = this.schema.validate(obj, options);
        console.log(result);

        if (!result.error) return null;
        const errors = {};
        for (let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;
        console.log('Form submitted');
        const obj = {email: this.state.email, password: this.state.password};
        await loginUser(obj);
        toast.success('You are logged successfully!');
        this.setState({isDisabled: true});

    };

    adminRedirect = () => {
        this.props.history.push("/admin");
    }


    render() {
        return (
            <div>
                <Container fluid={true}>
                    {this.state.loggedUser === null &&
                    <Row className="justify-content-center">
                        <Col className="p-3" md={9}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup className="pt-4 pb-4">
                                    <Row>
                                        <Col>
                                            <FormControl
                                                autoFocus={true}
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder={"Email"}
                                                value={this.state.email}
                                                onChange={this.handleChange}/>
                                            {this.state.errors.email &&
                                            <div className="alert alert-danger">
                                                {this.state.errors.email}
                                            </div>}
                                        </Col>
                                        <Col>
                                            <FormControl
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder={"Password"}
                                                value={this.state.password}
                                                onChange={this.handleChange}/>
                                            {this.state.errors.password &&
                                            <div className="alert alert-danger">
                                                {this.state.errors.password}
                                            </div>}
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <Row className="pt-2">
                                    <Col>
                                        <Row className="justify-content-end px-3">
                                            {this.state.isDisabled &&
                                            <Button
                                                className="d-inline-block"
                                                variant="primary"
                                                onClick={this.adminRedirect}>
                                                GO TO ADMIN PANEL
                                            </Button>}
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row className="justify-content-end px-3">
                                            <Button
                                                className="d-inline-block"
                                                variant="success"
                                                disabled={this.state.isDisabled}
                                                type="submit">
                                                SUBMIT
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    }
                    {this.state.loggedUser &&
                    <div>
                        <h3>There is another User already logged in!</h3>
                        <h4>Only one user at a time can be logged!</h4>
                    </div>}
                </Container>
            </div>
        );
    }

}

export default LoginForm;
