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
import Card from "react-bootstrap/Card";
import '../../css/admin.css';
import {getClubBio, updateClubBio} from "../../services/clubbioService";

class UpdateClubBioForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: {
                bioTitle: "",
                bioText: ""
            },
            errors: {},
            isDisabled: true
        }
    }

    schema = Joi.object({
        _id: Joi.string(),
        bioTitle: Joi.string()
            .required()
            .min(5)
            .max(50)
            .label('BioTitle'),
        bioText: Joi.string()
            .required()
            .min(5)
            .label('BioText')
    });


    async componentDidMount() {
        await this.populateBio();
        console.log(this.state.bio);
    }

    handleChange = (event) => {
        const bio = {...this.state.bio};
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        bio[name] = value;
        this.setState({
            bio,
            isDisabled: false
        });
    }


    validate = () => {
        const obj = {
            bioTitle: this.state.bio.bioTitle,
            bioText: this.state.bio.bioText
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

        const obj = {
            bioTitle: this.state.bio.bioTitle,
            bioText: this.state.bio.bioText
        };

        this.setState({isDisabled: true});
        toast.success('ClubBio update was successful!');
        await updateClubBio(obj, this.state.bio._id);
    }


    async populateBio() {
        try {
            const bioId = this.props.match.params.id;
            const {data: bio} = await getClubBio(bioId);
            this.setState({bio: this.mapToViewModel(bio)});
        } catch (e) {
            if (e.response && e.response.status === 404)
                console.log('There is no Club Bio with this ID!');
        }
    }


    mapToViewModel(bio) {
        return {
            _id: bio._id,
            bioTitle: bio.bioTitle,
            bioText: bio.bioText
        };
    }


    adminRedirect = () => {
        this.props.history.push("/admin/bioslist");
    }

    render() {
        return (
            <div>
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>Update Club biography Form :</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Body>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <FormLabel>
                                                Club Biography Title
                                            </FormLabel>
                                            <FormControl
                                                className="admin-form-control"
                                                autoFocus={true}
                                                name="bioTitle"
                                                type="text"
                                                value={this.state.bio.bioTitle}
                                                placeholder="Enter the title for the club biography"
                                                onChange={this.handleChange}/>
                                            {this.state.errors.bioTitle &&
                                            <p className="text-danger pt-2">
                                                {this.state.errors.bioTitle}
                                            </p>}
                                        </FormGroup>
                                        <FormGroup>
                                            <FormLabel>
                                                Club Biography Text
                                            </FormLabel>
                                            <FormControl
                                                className="admin-form-control"
                                                name="bioText"
                                                as="textarea"
                                                rows="8"
                                                value={this.state.bio.bioText}
                                                placeholder="Enter the text for the club biography"
                                                onChange={this.handleChange}/>
                                            {this.state.errors.bioText &&
                                            <p className="text-danger pt-2">
                                                {this.state.errors.bioText}
                                            </p>}
                                        </FormGroup>
                                        <Row className="mt-5">
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
                                                    BACK TO CLUB BIOS LIST
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

export default UpdateClubBioForm;
