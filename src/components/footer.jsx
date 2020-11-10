import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Container, Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import {useTranslation} from "react-i18next";

function Footer(props) {

    const { t, i18n } = useTranslation();

    async function handleLanguage (language){
        await i18n.changeLanguage(language);
    }


    return (
        <div>
            <footer className="bg-danger">
                <Container className="p-0">
                <Row className="w-100 m-0">
                    <Col>
                        <Navbar>
                        <Nav className="mr-auto flex-column">
                            <span>{t('Footer.ClubName')}</span>
                            <span>{t('Footer.Country')}</span>
                            <span>{t('Footer.Street')}</span>
                            <span>{t('Footer.Tel')}</span>
                            <span>{t('Footer.Email')}</span>
                        </Nav>
                        </Navbar>
                    </Col>
                    <Col>
                        <Navbar>
                            <Nav className="ml-auto flex-column">
                                <Link  className="nav-link p-0" to="/news">{t('Navigation.News')}</Link>
                                <Link  className="nav-link p-0" to="/clubbio">{t('Navigation.Club')}</Link>
                                <Link  className="nav-link p-0" to="/schedule">{t('Navigation.Training')}</Link>
                                <Link  className="nav-link p-0" to="/events">{t('Navigation.Events')}</Link>
                                <Link  className="nav-link p-0" to="/contacts">{t('Navigation.Contacts')}</Link>
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
                </Container>
            </footer>
        </div>
    );
}

export default Footer;
