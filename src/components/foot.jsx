import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Container, Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import {Link, NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {faAddressBook, faBullhorn, faCalendarAlt, faThList, faToriiGate, faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";
import '../css/footer.css';

function Foot(props) {

    const {t, i18n} = useTranslation();

    async function handleLanguage(language) {
        await i18n.changeLanguage(language);
    }


    return (
        <div>
            <footer className="i-footer">
                <Container className="p-0">
                    <Row className="w-100 m-0">
                        <Col>
                            <Navbar>
                                <Nav className="mr-auto flex-column">
                                    <span>{t('Foot.ClubName')}</span>
                                    <span>{t('Foot.Country')}</span>
                                    <span>{t('Foot.Street')}</span>
                                    <span>{t('Foot.Tel')}</span>
                                    <span>{t('Foot.Email')}</span>
                                    <Row className="ml-0">
                                        <a className="i-footer-link p-0 mr-2"
                                           href="https://www.facebook.com/Iseido-Shotokan-Karate-club-142528162447145">
                                            <FontAwesomeIcon icon={faFacebook}/></a>
                                        <a className="i-footer-link p-0 mr-2" href="https://www.instagram.com/flurviansea/">
                                            <FontAwesomeIcon icon={faInstagram}/></a>
                                        <a className="i-footer-link p-0 mr-2" href="https://www.linkedin.com/in/asen-georgiev-214527180/">
                                            <FontAwesomeIcon icon={faLinkedin}/></a>
                                        <a className="i-footer-link p-0" href="https://www.linkedin.com/in/asen-georgiev-214527180/">
                                            <FontAwesomeIcon icon={faTwitter}/></a>
                                    </Row>
                                </Nav>
                            </Navbar>
                        </Col>
                        <Col>
                            <Navbar>
                                <Nav className="ml-auto flex-column">
                                    <Link className="i-footer-link p-0" to="/">
                                        <FontAwesomeIcon icon={faHome}/>
                                        <span> {t('Navigation.Home')}</span>
                                    </Link>
                                    <Link className="i-footer-link p-0" to="/news">
                                        <FontAwesomeIcon icon={faBullhorn}/>
                                        <span> {t('Navigation.News')}</span>
                                    </Link>
                                    <Link className="i-footer-link p-0" to="/clubbio">
                                        <FontAwesomeIcon icon={faToriiGate}/>
                                        <span> {t('Navigation.Club')}</span>
                                    </Link>
                                    <Link className="i-footer-link p-0" to="/schedule">
                                        <FontAwesomeIcon icon={faThList}/>
                                        <span> {t('Navigation.Training')}</span>
                                    </Link>
                                    <Link className="i-footer-link p-0" to="/events">
                                        <FontAwesomeIcon icon={faCalendarAlt}/>
                                        <span> {t('Navigation.Events')}</span>
                                    </Link>
                                    <Link className="i-footer-link p-0" to="/contacts">
                                        <FontAwesomeIcon icon={faAddressBook}/>
                                        <span> {t('Navigation.Contacts')}</span>
                                    </Link>
                                </Nav>
                            </Navbar>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}

export default Foot;
