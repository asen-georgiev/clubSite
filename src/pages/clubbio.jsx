import React, {Component, useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {getClubBios} from "../services/clubbioService";
import {Image} from "react-bootstrap";
import Biographs from "../components/biographs";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import '../css/clubbio.css';
import {useTranslation} from "react-i18next";


function Clubbio (props) {

    const {t, i18n} = useTranslation();

    const[clubBios,setClubBios] = useState([]);

    useEffect(() => {
        (async() => {
            const {data: clubBios} = await getClubBios();
            setClubBios(clubBios);
        })();
    },[]);


        return (
            <div>
                <Container className="bio-container container" fluid={true}>

                    <Row className="m-0">
                    <Col>
                        <Row className="bio-row d-flex justify-content-start mx-0">
                            <h3>{t('Rows.Bio.Main')} :</h3>
                        </Row>
                    <Row className="m-0">
                        <Card
                            style={{width: '80rem'}}
                            className="bio-biocard ml-auto mr-auto mb-3">
                            <div className="card-img-wrap">
                                <Card.Img
                                    className="bio-biocard-img"
                                    src={require('../assets/images/wide5.jpg')}
                                    alt="Card image"/>
                                <Card.ImgOverlay className="overflow-auto d-flex align-items-stretch">
                                    <Carousel>
                                        {clubBios.map(cbs => {
                                            return (
                                                <Carousel.Item key={cbs._id}>
                                                    <h3>{cbs.bioTitle}</h3>
                                                    {cbs.bioText}
                                                </Carousel.Item>
                                            )
                                        })}
                                    </Carousel>
                                </Card.ImgOverlay>
                            </div>
                        </Card>
                    </Row>
                    </Col>
                    </Row>
                </Container>
            </div>
        );
}

export default Clubbio;
