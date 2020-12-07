import React, {Component, useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import {CardImg, Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {getLastNew, getNew, getNews} from "../services/newsService";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import {picturesUrl} from "../config.json";
import Newscards from "../components/newscards";
import _ from "lodash";
import '../css/news.css';
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";

const picUrl = process.env.REACT_APP_PICTURES_URL;

function News(props) {

    const {t, i18n} = useTranslation();

    const [news, setNews] = useState([]);
    const [anew, setAnew] = useState([]);
    const [url,setUrl] = useState('');


    useEffect(() => {
        (async () => {
            const url = picUrl;
            const {data: news} = await getNews();
            let anew = _.first(news);
            setUrl(url);
            setNews(news);
            setAnew(anew);
        })();
    }, [])


    const handleNews = async (anewId) => {
        const {data: anew} = await getNew(anewId);
        setAnew(anew);
    }


    return (
        <div>
            <Container className="news-containter container d-flex flex-row" fluid={true}>
                <Row className="m-0">
                    <Col md={6}>
                        <Row className="news-row d-flex justify-content-start">
                            <h3>{t('Rows.News.Main')} :</h3>
                        </Row>
                        <Card
                            className="news-maincard"
                            style={{width: '33rem'}}>
                            <Card.Header>
                                {t('News.CardHeader')} {anew.newsDate}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    {anew.title}
                                </Card.Title>
                                <div className="card-img-wrap">
                                    <CardImg
                                        variant="bottom"
                                        src={url + anew.pictureName}
                                        alt="No Image"/>
                                </div>
                                <br/>
                                <Card.Text>
                                    {anew.text}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Card.Link
                                    className="news-cardlink"
                                    href={"http://" + anew.linkTo}>
                                    {t('News.Links.Info')} : {anew.linkTo}
                                </Card.Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Row className="news-row d-flex justify-content-start">
                            <h3>{t('Rows.News.More')}:</h3>
                        </Row>
                        <Container fluid={true} className="p-0 news-newscontainer">
                            {news.map(ns => {
                                return (
                                    <Card key={ns._id} style={{width: '32rem'}}
                                          className="news-maincard flex-row p-2 mb-3 my-0">
                                        <CardImg
                                            variant="top"
                                            src={url + ns.pictureName}
                                            style={{width: '10rem', height: '10rem'}}
                                            alt="No Image"/>
                                        <Card.Body>
                                            <Card.Title>{ns.title}</Card.Title>
                                            <Card.Subtitle>{ns.newsDate}</Card.Subtitle>
                                            <br/>
                                            <Button onClick={() => handleNews(ns._id)}>
                                                {t('News.Links.Article')}
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                        </Container>
                        {/*<Newscards news={this.state.news} onNewSelect={this.handleNews}/>*/}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default News;
