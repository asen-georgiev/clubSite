import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import '../../css/admin.css';
import Card from "react-bootstrap/Card";
import {deleteTimeTable, getTimeTables} from "../../services/timetableService";

class AllTimeTablesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timetables: []
        }
    }

    async componentDidMount() {
        const {data: timetables} = await getTimeTables();
        this.setState({timetables});
        console.log(this.state.timetables);
    }


    handleDelete = async(timetable) =>{
        const allTimeTables = this.state.timetables;
        const timetables = allTimeTables.filter(tim => tim._id !== timetable._id);
        this.setState({timetables});

        try{
            await deleteTimeTable(timetable._id);
        }
        catch (e) {
            if(e.response && e.response.status === 404)
                console.log('Timetable with the given ID was not found!');
            toast.error('This time table has already been deleted!');
            this.setState({timetables: allTimeTables});
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
                                <h3>All Timetables list :</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Header>
                            <Button
                                className="admin-button-update"
                                onClick={this.adminRedirect}>
                               BACK TO ADMIN PANEL
                            </Button>
                                </Card.Header>
                    <Card.Body className="overflow-auto" style={{height:600}}>
                    <Table striped bordered hover className="admin-maincard">
                        <thead>
                        <tr>
                            <th>Course name</th>
                            <th>Course day</th>
                            <th>Course hour</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.timetables.map((timetab, i) => {
                            return (
                                <tr key={timetab._id}>
                                    <td>{timetab.course.courseName}</td>
                                    <td>{timetab.timedh.day}</td>
                                    <td>{timetab.timedh.hour}</td>
                                    <td>
                                        <Link
                                            className="admin-button-submit btn"
                                            to={`/admin/timetablelist/${timetab._id}`}>
                                            Update
                                        </Link>
                                    </td>
                                    <td>
                                        <Button
                                            className="admin-button-delete"
                                            onClick={() => this.handleDelete(timetab)}>
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

export default AllTimeTablesList;
