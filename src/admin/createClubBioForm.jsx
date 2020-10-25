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
import {createClubBio} from "../services/clubbioService";



class CreateClubBioForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            bioTitle:'',
            bioText:'',
            errors:{},
            isDisabled: false
        }
    }


    schema = Joi.object({
        bioTitle: Joi.string()
            .required()
            .min(5)
            .max(50)
            .label('BioTitle'),
        bioText: Joi.string()
            .required()
            .min(5)
            .label('BioText')
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
            bioTitle: this.state.bioTitle,
            bioText: this.state.bioText
        }
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
        this.setState({errors: errors ||{}});
        console.log(errors);
        if(errors)return;

        this.setState({isDisabled:true});

        const obj = {
            bioTitle: this.state.bioTitle,
            bioText: this.state.bioText
        }
        await createClubBio(obj);
        toast.success('New club biography was successfully created!');
    }



    adminRedirect = () =>{
        this.props.history.push("/admin");
    }


    render() {
        return (
            <div>
                <Container fluid={true}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <FormLabel>
                               Club Bio Title
                            </FormLabel>
                            <FormControl
                            autoFocus={true}
                            name="bioTitle"
                            type="text"
                            placeholder="Enter the title for the club biography"
                            onChange={this.handleChange}/>
                            {this.state.errors.bioTitle &&
                            <p className="text-danger pt-2">
                                {this.state.errors.bioTitle}
                            </p>}
                            <FormLabel>
                                Club Bio Text
                            </FormLabel>
                            <FormControl
                            name="bioText"
                            as="textarea"
                            rows="10"
                            placeholder="Enter the text for the club biography"
                            onChange={this.handleChange}/>
                            {this.state.errors.bioText &&
                            <p className="text-danger pt-2">
                                {this.state.errors.bioText}
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

export default CreateClubBioForm;
