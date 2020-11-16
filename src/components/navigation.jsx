import React, {Component, useState} from 'react';
import {useTranslation} from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import {DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAddressBook, faBullhorn, faCalendarAlt, faThList, faToriiGate,faHome} from "@fortawesome/free-solid-svg-icons";
import '../css/navigation.css';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import Button from "react-bootstrap/Button";


function Navigation (props) {

    const { t, i18n } = useTranslation();

    async function handleLanguage (language){
        await i18n.changeLanguage(language);
    }

        return (
            <div>
                <header>
                <Navbar className="i-navbar p-3 px-5" expand="xl">
                    <Link className="pb-0" to="/"><img  src={require('../assets/images/dhlogo.png')} width="170" height="auto" alt="DevhostBg"/></Link>
                    <Navbar.Toggle className="border-0" aria-controls="navbar-toggle"/>
                    <Navbar.Collapse id="navbar-toggle">
                        <Nav className="ml-auto pr-2">
                            <Link  className="i-navbar-link" to="/">
                                <FontAwesomeIcon icon={faHome} className="icon"/>
                                <span> {t('Navigation.Home')}</span>
                            </Link>
                            <Link  className="i-navbar-link" to="/news">
                                <FontAwesomeIcon icon={faBullhorn} className="icon"/>
                                    <span> {t('Navigation.News')}</span>
                            </Link>
                            <Link  className="i-navbar-link" to="/clubbio">
                                <FontAwesomeIcon icon={faToriiGate}/>
                                <span> {t('Navigation.Club')}</span>
                                </Link>
                            <Link  className="i-navbar-link" to="/schedule">
                                <FontAwesomeIcon icon={faThList}/>
                                <span> {t('Navigation.Training')}</span>
                            </Link>
                            <Link  className="i-navbar-link" to="/events">
                                <FontAwesomeIcon icon={faCalendarAlt}/>
                                <span> {t('Navigation.Events')}</span>
                            </Link>
                            <Link  className="i-navbar-link" to="/contacts">
                                <FontAwesomeIcon icon={faAddressBook}/>
                                <span> {t('Navigation.Contacts')}</span>
                            </Link>
                            <DropdownButton className="btn btn-primary" title={t('Navigation.Language')}>
                                    <DropdownItem onClick={()=>handleLanguage('en')}>EN</DropdownItem>
                                    <DropdownItem onClick={()=>handleLanguage('bg')}>BG</DropdownItem>
                            </DropdownButton>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                </header>
            </div>
        );

}

export default Navigation;
