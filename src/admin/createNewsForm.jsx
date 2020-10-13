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
import {createNews} from "../services/newsService";


class CreateNewsForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            title:'',
            text:'',
            linkTo:'',
            errors:{},
            isDisabled:false
        }
    };

    schema = Joi.object({
        title: Joi.string()
            .required()
            .min(5)
            .max(50)
            .label("Title"),
        text: Joi.string()
            .required()
            .min(10)
            .max(1024)
            .label("Text"),
        linkTo: Joi.string()
            .min(0)
            .max(255)
            .label("Link")
            .allow('')

    })

    handleChange = (event) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    validate = () =>{
        const obj = {
            title: this.state.title,
            text: this.state.text,
            linkTo: this.state.linkTo
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


    handleSubmit = async(event)=>{
        event.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        console.log(errors);
        if (errors) return;
        this.setState({isDisabled: true});
        console.log('The news are created!');

        const obj = {
            title: this.state.title,
            text: this.state.text,
            linkTo: this.state.linkTo
        };

        await createNews(obj);
        toast.success('The news are created!');
    }

    adminRedirect = () => {
        this.props.history.push("/admin")
    }

    render() {
        return (
            <div>
                <Container fluid={true}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <FormLabel>
                                    Title
                                </FormLabel>
                                <FormControl
                                    autoFocus={true}
                                    name="title"
                                    type="text"
                                    value={this.state.title}
                                    placeholder="Enter news title"
                                    onChange={this.handleChange}
                                />
                                {this.state.errors.title &&
                                <p className="text-danger pt-2">
                                    {this.state.errors.title}
                                </p>}
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>
                                    Text
                                </FormLabel>
                                <FormControl
                                    name="text"
                                    as="textarea"
                                    rows="5"
                                    value={this.state.text}
                                    placeholder="Enter news text"
                                    onChange={this.handleChange}/>
                                {this.state.errors.text &&
                                <p className="text-danger pt-2">
                                    {this.state.errors.text}
                                </p>}
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>
                                    Link
                                </FormLabel>
                                <FormControl
                                    name="linkTo"
                                    type="text"
                                    value={this.state.linkTo}
                                    placeholder="Enter news link"
                                    onChange={this.handleChange}/>
                                {this.state.errors.linkTo &&
                                <p className="text-danger pt-2">
                                    {this.state.errors.linkTo}
                                </p>}
                            </FormGroup>
                            <Row>
                                <Col md={4}>
                                    <Button variant="primary" type="submit" disabled={this.state.isDisabled}>
                                        Submit
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

export default CreateNewsForm;
