import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {Button, Image} from "react-bootstrap";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import '../../css/admin.css';
import Card from "react-bootstrap/Card";
import {picturesUrl} from "../../config.json";
import {deleteNew, getNews} from "../../services/newsService";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";
import Accordion from 'react-bootstrap/Accordion'
import AccordionToggle, {useAccordionToggle} from 'react-bootstrap/AccordionToggle';
import AccordionCollapse from "react-bootstrap/AccordionCollapse";

class AllNewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: []
        }
    }


    async componentDidMount() {
        const {data: news} = await getNews();
        this.setState({news});
        console.log(this.state.news);
    }


    handleDelete = async (anew) => {
        const allNews = this.state.news;
        const news = allNews.filter(n => n._id !== anew._id);
        this.setState({news});

        try {
            await deleteNew(anew._id);
        } catch (e) {
            if (e.response && e.response.status === 404)
                console.log('The New with the given ID was not found!');
            toast.error('The New has already been deleted!');
            this.setState({news: allNews});
        }
    }


    adminRedirect = () => {
        this.props.history.push("/admin");
    }

    render() {
        return (
            <div>
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>All News list :</h3>
                            </Row>
                            <Accordion>
                                <Card className="admin-maincard overflow-auto">
                                    <Card.Header>
                                        <Button
                                            className="admin-button-update"
                                            onClick={this.adminRedirect}>
                                            BACK TO ADMIN PANEL
                                        </Button>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table striped bordered hover className="admin-maincard">
                                            <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Text</th>
                                                <th>Date</th>
                                                <th>Link</th>
                                                <th>Thumbnail</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.news.map(n => {
                                                return (
                                                    <tr key={n._id}>
                                                        <td>{n.title}</td>
                                                        <td>
                                                            <div
                                                                className="overflow-auto"
                                                                style={{height: 130}}>
                                                                {n.text}
                                                            </div>
                                                        </td>
                                                        <td>{n.newsDate}</td>
                                                        <td>
                                                            <a className="admin-cardlink" href={"http://" + n.linkTo}>
                                                                {n.linkTo}
                                                            </a>
                                                        </td>
                                                        <td>
                                                            <Image src={picturesUrl + n.pictureName} width="100"/>
                                                        </td>
                                                        <td>
                                                            <Link className="admin-button-update btn"
                                                                  to={`/admin/newslist/${n._id}`}>
                                                                Update
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                className="admin-button-delete"
                                                                onClick={() => this.handleDelete(n)}>
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Accordion>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AllNewsList;
