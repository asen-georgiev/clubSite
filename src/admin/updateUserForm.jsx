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
import FormCheck from "react-bootstrap/FormCheck";
import {getUser, updateUser} from "../services/userService";

class UpdateUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                email: "",
                password: "",
                isAdmin: false,
            },
            errors: {},
            isDisabled: false
        }
    }

    schema = Joi.object({
        _id: Joi.string(),
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
        const user = {...this.state.user}
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        user[name] = value;
        this.setState({user});
    };

    validate = () => {
        const obj = {
            name: this.state.user.name,
            email: this.state.user.email,
            password: this.state.user.password,
            isAdmin: this.state.user.isAdmin
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

    async populateUser() {
        try {
            const userId = this.props.match.params.id;
            const {data: user} = await getUser(userId);
            this.setState({user: this.mapToViewModel(user)});
        } catch (e) {
            if (e.response && e.response.status === 404)
                console.log(`There is no User with this ID!`);
        }
    }

    async componentDidMount() {
        await this.populateUser();
        console.log(this.state.user);
    }

    mapToViewModel(user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        const obj = {
            name: this.state.user.name,
            email: this.state.user.email,
            password: this.state.user.password,
            isAdmin: this.state.user.isAdmin
        };
        await updateUser(obj, this.state.user._id);
        this.setState({isDisabled: true});
        toast.success('User update was successful!');

    }

    adminRedirect = () => {
        this.props.history.push("/admin/userslist")
    }


    render() {
        return (
            <div>
                <Container className="container bg-secondary" fluid={true}>
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
                                value={this.state.user.name}
                                placeholder="Enter full name"
                                onChange={this.handleChange}/>
                            {this.state.errors.name &&
                            <p className="text-danger pt-2">
                                {this.state.errors.name}
                            </p>}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl
                                id="email"
                                name="email"
                                type="email"
                                value={this.state.user.email}
                                placeholder="Enter email"
                                onChange={this.handleChange}/>
                            {this.state.errors.email &&
                            <p className="text-danger pt-2">
                                {this.state.errors.email}
                            </p>}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <FormControl
                                id="password"
                                name="password"
                                type="password"
                                value={this.state.user.password}
                                placeholder="Enter password"
                                onChange={this.handleChange}/>
                            {this.state.errors.password &&
                            <p className="text-danger pt-2">
                                {this.state.errors.password}
                            </p>}
                        </FormGroup>
                        <FormGroup>
                            <FormCheck
                                id="isAdmin"
                                name="isAdmin"
                                type="checkbox"
                                checked={this.state.user.isAdmin}
                                value={this.state.user.isAdmin}
                                label="Admin rights"
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <Row>
                            <Col md={4}>
                                <Button variant="primary" type="submit" disabled={this.state.isDisabled}>
                                    Update
                                </Button>
                            </Col>
                            <Col md={{span: 4, offset: 4}}>
                                <Button variant="primary" onClick={this.adminRedirect}>
                                    Back to Users list
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default UpdateUserForm;
