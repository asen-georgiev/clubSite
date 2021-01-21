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
import Paginate from "../../components/paginate";
import {paginateFunct} from "../../services/paginateFunct";


const picUrl = process.env.REACT_APP_PICTURES_URL;

class AllNewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            newsPerPage:3,
            currentPage:1
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

    //Re rendering the element using this handler to render cloned news array depending on the page.
    //С рирендването на елемента и промяната на стойностите на стейта = currentPage,
    //Променяме и стойностите, които се извикват в рендър метода на paginateFunct()
    handlePageChange = (pageNumber) => {
        this.setState({currentPage: pageNumber});
    }

    adminRedirect = () => {
        this.props.history.push("/admin");
    }

    render() {

        const paginatedNews = paginateFunct(this.state.news,this.state.newsPerPage,this.state.currentPage);

        return (
            <div>
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>All News list :</h3>
                            </Row>
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
                                            {paginatedNews.map(n => {
                                                return (
                                                    <tr key={n._id}>
                                                        <td>{n.title}</td>
                                                        <td>
                                                            <div
                                                                className="overflow-auto"
                                                                style={{height: 150}}>
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
                                                            <Image src={picUrl + n.pictureName} width="100"/>
                                                        </td>
                                                        <td>
                                                            <Link className="admin-button-submit btn"
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
                                        <Paginate
                                        itemsCount={this.state.news.length}
                                        itemsPerPage={this.state.newsPerPage}
                                        currentPage={this.state.currentPage}
                                        onPageChange={this.handlePageChange}/>
                                    </Card.Body>
                                </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AllNewsList;
