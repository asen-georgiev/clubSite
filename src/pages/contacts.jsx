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


function Contacts(props) {

    const { t, i18n } = useTranslation();


    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);


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
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsDisabled(true);
        const obj = {
            fullname: fullname,
            email: email,
            subject: subject,
            message: message
        };
        await sendEmail(obj);
        console.log(obj);
    }

    return (
        <div>
            <Container fluid={true}>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel>
                            {t('Contacts.Fullname')}
                        </FormLabel>
                        <FormControl
                            id="fullname"
                            name="fullname"
                            value={fullname}
                            type="text"
                            placeholder={t('Contacts.Fullname')}
                            onChange={event => setFullname(event.target.value)}/>
                        <FormLabel>
                            {t('Contacts.Email')}
                        </FormLabel>
                        <FormControl
                            id="email"
                            name="email"
                            value={email}
                            type="email"
                            placeholder={t('Contacts.Email')}
                            onChange={event => setEmail(event.target.value)}/>
                        <FormLabel>
                            {t('Contacts.Subject')}
                        </FormLabel>
                        <FormControl
                            id="subject"
                            name="subject"
                            value={subject}
                            type="text"
                            placeholder={t('Contacts.Subject')}
                            onChange={event => setSubject(event.target.value)}/>
                        <FormLabel>
                            {t('Contacts.Message')}
                        </FormLabel>
                        <FormControl
                            id="message"
                            name="message"
                            value={message}
                            as="textarea"
                            placeholder={t('Contacts.Message')}
                            rows="3"
                            onChange={event => setMessage(event.target.value)}/>
                    </FormGroup>
                    <Row>
                        <Button
                            variant="success"
                            type="submit"
                            disabled={isDisabled}>
                            {t('Contacts.Send')}
                        </Button>
                    </Row>
                </Form>
            </Container>
        </div>
    );
}

export default Contacts;
