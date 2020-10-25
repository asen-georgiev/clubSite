import React, {Component} from 'react';
import {useTranslation} from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import {DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import News from "../pages/news";


function Navigation () {

    const { t, i18n } = useTranslation();

    async function handleLanguage (language){
        await i18n.changeLanguage(language);
    }



        return (
            <div>
                <Navbar className="i-navbar bg-dark p-0" expand="lg">
                    <Link className="pb-0" to="/"><img  src={require('../assets/images/dhlogo.png')} width="170" height="auto" alt="DevhostBg"/></Link>
                    <Navbar.Toggle className="border-0" aria-controls="navbar-toggle"/>
                    <Navbar.Collapse id="navbar-toggle">
                        <Nav className="ml-auto pr-2">
                            <Link  className="i-navbar-links nav-link" to="/news">{t('Navigation.News')}</Link>
                            <Link  className="i-navbar-links nav-link" to="/clubbio">{t('Navigation.Club')}</Link>
                            <Link  className="i-navbar-links nav-link" to="/schedule">{t('Navigation.Training')}</Link>
                            <Link  className="i-navbar-links nav-link" to="/events">{t('Navigation.Events')}</Link>
                            <Link  className="i-navbar-links nav-link" to="/contacts">{t('Navigation.Contacts')}</Link>
                            <DropdownButton variant="dark" title={t('Navigation.Language')}>
                                <DropdownItem onClick={()=>handleLanguage('en')}>EN</DropdownItem>
                                <DropdownItem onClick={()=>handleLanguage('bg')}>BG</DropdownItem>
                            </DropdownButton>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <p></p>
            </div>
        );

}

export default Navigation;
