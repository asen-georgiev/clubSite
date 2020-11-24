import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import Joi from "joi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {FormLabel} from "react-bootstrap";
import {sendEmail} from "../services/emailService";
import {useTranslation} from "react-i18next";
import '../css/contacts.css';
import Card from "react-bootstrap/Card";


function Contacts(props) {

    const { t, i18n } = useTranslation();


    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [errors,setErrors]=useState({});


    const schema = Joi.object({
        fullname: Joi.string()
            .required()
            .min(5)
            .max(50)
            .label("Full name"),
        email: Joi.string()
            .required()
            .min(5)
            .max(50)
            .label("Email"),
        subject: Joi.string()
            .required()
            .min(5)
            .max(255)
            .label("Subject"),
        message: Joi.string()
            .required()
            .min(5)
            .max(1000)
            .label("Message")
    })

    const validate = () =>{
        const obj = {
            fullname: fullname,
            email: email,
            subject: subject,
            message: message
        };
        const options = {abortEarly:false};
        const result = schema.validate(obj,options);
        console.log(result);

        if(!result.error) return null;

        const errors = {};
        for(let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate();
        setErrors(errors || {});
        console.log(errors);
        if(errors) return toast.error("Wrong credentials - your message was not sent!");

        setIsDisabled(true);
        const obj = {
            fullname: fullname,
            email: email,
            subject: subject,
            message: message
        };
        toast.success('Your message was sent successfully!');
        props.history.push("/news");
        await sendEmail(obj);
    }

    return (
        <div>
            <Container className="contacts-container container" fluid={true}>
                <Row className="m-0">
                    <Col md={6}>
                        <Row className="contacts-row d-flex justify-content-start ml-auto mr-auto">
                            <h3>Feel free to write us :</h3>
                        </Row>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel>
                            {/*{t('Contacts.Fullname')}*/}
                        </FormLabel>
                        <FormControl
                            className="contacts-form-control"
                            id="fullname"
                            name="fullname"
                            value={fullname}
                            type="text"
                            placeholder={t('Contacts.Fullname')}
                            onChange={event => setFullname(event.target.value)}/>
                        {errors.fullname &&
                        <div className="alert alert-danger">
                            {errors.fullname}
                        </div>}
                        <FormLabel>
                            {/*{t('Contacts.Email')}*/}
                        </FormLabel>
                        <FormControl
                            className="contacts-form-control"
                            id="email"
                            name="email"
                            value={email}
                            type="email"
                            placeholder={t('Contacts.Email')}
                            onChange={event => setEmail(event.target.value)}/>
                        {errors.email &&
                        <div className="alert alert-danger">
                            {errors.email}
                        </div>}
                        <FormLabel>
                            {/*{t('Contacts.Subject')}*/}
                        </FormLabel>
                        <FormControl
                            className="contacts-form-control"
                            id="subject"
                            name="subject"
                            value={subject}
                            type="text"
                            placeholder={t('Contacts.Subject')}
                            onChange={event => setSubject(event.target.value)}/>
                        {errors.subject &&
                        <div className="alert alert-danger">
                            {errors.subject}
                        </div>}
                        <FormLabel>
                            {/*{t('Contacts.Message')}*/}
                        </FormLabel>
                        <FormControl
                            className="contacts-form-control"
                            id="message"
                            name="message"
                            value={message}
                            as="textarea"
                            placeholder={t('Contacts.Message')}
                            rows="5"
                            onChange={event => setMessage(event.target.value)}/>
                        {errors.message &&
                        <div className="alert alert-danger">
                            {errors.message}
                        </div>}
                    </FormGroup>
                    <Row className="justify-content-end">
                        <Button
                            className="mr-3"
                            type="submit"
                            disabled={isDisabled}>
                            {t('Contacts.Send')}
                        </Button>
                    </Row>
                </Form>
                    </Col>
                    <Col md={6}>
                        <Row className="contacts-row d-flex justify-content-start mr-auto ml-auto">
                            <h3>Coordinates for contact :</h3>
                        </Row>
                        <Row className="m-0">
                            <Card
                                style={{width: '33rem',height:'35rem'}}
                                className="contacts-maincard mr-auto">
                                <Card.Header className="text-center">For more information call us on gsm: +359/897 05 73 75</Card.Header>
                                <Card.Body>
                                    <Card.Title className="text-center">Warriors karate dojo</Card.Title>
                                    <Card.Subtitle className="text-center">e-mail: warriors@abv.bg</Card.Subtitle>
                                    <br/>
                                    <div className="mapouter-contacts">
                                        <div className="gmap_canvas-contacts">
                                            <iframe
                                                className="contacts-map-frame"
                                                src="https://maps.google.com/maps?q=Sandanski&t=&z=17&ie=UTF8&iwloc=&output=embed"
                                                frameBorder="1">
                                            </iframe>
                                            </div>
                                    </div>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    Bulgaria, Sandanski 2800 Dimitar Popgeorgiev str.1
                                </Card.Footer>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Contacts;
