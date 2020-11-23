import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
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
                <Container className="container bg-light" fluid={true}>
                    <h1>All Time Tables List</h1>
                    <Row>
                        <Col md={4}>
                            <Button variant="primary" onClick={this.adminRedirect}>
                                Back to Admin Panel
                            </Button>
                        </Col>
                    </Row>
                    <Table striped bordered hover variant="light">
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
                                        <Link to={`/admin/timetablelist/${timetab._id}`}>
                                            Update
                                        </Link>
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() => this.handleDelete(timetab)}>
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

export default AllTimeTablesList;
