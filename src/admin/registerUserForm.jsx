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
import {registerUser} from "../services/userService";
import {FormLabel} from "react-bootstrap";
import FormCheck from "react-bootstrap/FormCheck";



class RegisterUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            email:"",
            password:"",
            isAdmin: false,
            errors:{},
            isDisabled:false
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
            .min(5)
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
            [name]: value
        });
    };

    validate = () =>{
        const obj = {
            name: this.state.name,
            email:this.state.email,
            password:this.state.password,
            isAdmin: this.state.isAdmin
        };
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
        this.setState({errors: errors || {}});
        if (errors) return;
        this.setState({isDisabled:true});
        console.log('The user is registered');
        const obj = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            isAdmin:this.state.isAdmin
        };
        await registerUser(obj);
        this.props.history.push("/admin");
        toast.success('User registration was successful!');
    }

    adminRedirect = () => {
        this.props.history.push("/")
    }


    render() {
        return (
            <div>
                <Container fluid={true}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <FormLabel>
                                Full Name
                            </FormLabel>
                            <FormControl
                                autoFocus={true}
                                id="name"
                                name="name"
                                type="text"
                                value={this.state.name}
                                placeholder="Enter full name"
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl
                                id="email"
                                name="email"
                                type="email"
                                value={this.state.email}
                                placeholder="Enter email"
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <FormControl
                                id="password"
                                name="password"
                                type="password"
                                value={this.state.password}
                                placeholder="Enter password"
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <FormCheck
                                id="isAdmin"
                                name="isAdmin"
                                type="checkbox"
                                value={this.state.isAdmin}
                                label="Admin rights"
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <Row>
                            <Col md={4}>
                        <Button variant="primary" type="submit" disabled={this.state.isDisabled}>
                            Register
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

export default RegisterUserForm;
