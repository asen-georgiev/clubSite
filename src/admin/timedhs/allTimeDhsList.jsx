import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import '../../css/admin.css';
import {deleteTimeDH, getTimeDHs} from "../../services/timedhService";


class AllTimeDhsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timedhs: []
        }
    }

    async componentDidMount() {
        const {data: timedhs} = await getTimeDHs();
        this.setState({timedhs});
        console.log(this.state.timedhs);
    }


    handleDelete = async (timedh) => {
        const allTimeDhs = this.state.timedhs;
        const timedhs = allTimeDhs.filter(tim => tim._id !== timedh._id);
        this.setState({timedhs});

        try {
            await deleteTimeDH(timedh._id);
        } catch (e) {
            if (e.response && e.response.status === 404)
                console.log('TimeDh with the given ID was not found');
            toast.error('This Time:day/hour has been deleted already!');
            this.setState({timedhs: allTimeDhs});
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
                                <h3>All Days / Hours list:</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Header>
                                    <Button className="admin-button-update" onClick={this.adminRedirect}>
                                        BACK TO ADMIN PANEL
                                    </Button>
                                </Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover className="admin-maincard">
                                        <thead>
                                        <tr>
                                            <th>Course day</th>
                                            <th>Course hour</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.timedhs.map(tim => {
                                            return (
                                                <tr key={tim._id}>
                                                    <td>{tim.day}</td>
                                                    <td>{tim.hour}</td>
                                                    <td>
                                                        <Link
                                                            className="admin-button-submit btn"
                                                            to={`/admin/timedhslist/${tim._id}`}>
                                                            Update
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            className="admin-button-delete"
                                                            onClick={() => this.handleDelete(tim)}>
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
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AllTimeDhsList;
