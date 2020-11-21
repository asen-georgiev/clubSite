import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {Button, Image} from "react-bootstrap";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {picturesUrl} from "../../config.json";
import {deleteNew, getNews} from "../../services/newsService";

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



    handleDelete = async(anew) =>{
        const allNews = this.state.news;
        const news = allNews.filter(n => n._id !== anew._id);
        this.setState({news});

        try{
            await deleteNew(anew._id);
        }
        catch (e) {
            if(e.response && e.response.status === 404)
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
                <Container className="container bg-secondary" fluid={true}>
                    <h1>All News</h1>
                    <Row>
                        <Col md={4}>
                            <Button variant="primary" onClick={this.adminRedirect}>
                                Back to Admin Panel
                            </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Text</th>
                            <th>Date</th>
                            <th>News Date</th>
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
                                    <td>{n.text}</td>
                                    <td>{n.eventDate}</td>
                                    <td>{n.newsDate}</td>
                                    <td>
                                        <a href={"http://" + n.linkTo}>
                                            {n.linkTo}
                                        </a>
                                    </td>
                                    <td>
                                        <Image src={picturesUrl + n.pictureName} width="100"/>
                                    </td>
                                    <td>
                                        <Link to={`/admin/newslist/${n._id}`}>
                                            Update
                                        </Link>
                                    </td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => this.handleDelete(n)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default AllNewsList;
