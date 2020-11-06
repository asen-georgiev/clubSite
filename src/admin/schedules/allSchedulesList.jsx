import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {deleteSchedule, getSchedules} from "../../services/scheduleService";

class AllSchedulesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedules: []
        }
    }

    async componentDidMount() {
        const{data: schedules} = await getSchedules();
        this.setState({schedules});
        console.log(this.state.schedules);

    }


    handleDelete = async(schedule) =>{
        const allSchedules = this.state.schedules;
        const schedules = allSchedules.filter(s => s._id !== schedule._id);
        this.setState({schedules});

        try{
            await deleteSchedule(schedule._id);
        }
        catch (e) {
            if(e.response && e.response.status === 404)
                console.log("Schedule with the given ID was not found!");
            toast.error('This Schedule has already been deleted');
            this.setState({allSchedules});
        }
    }


    adminRedirect = () => {
        this.props.history.push("/admin");
    }


    render() {
        return (
            <div>
                <Container className="container bg-secondary" fluid={true}>
                    <h1>All Schedules</h1>
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
                                <th>Day</th>
                                <th>Age group</th>
                                <th>Class</th>
                                <th>Hour</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.schedules.map(sch => {
                            return(
                                <tr key={sch._id}>
                                    <td>{sch.classDay}</td>
                                    <td>{sch.classAge}</td>
                                    <td>{sch.classClass}</td>
                                    <td>{sch.classHour}</td>
                                    <td>
                                        <Link to={`/admin/scheduleslist/${sch._id}`}>
                                            Update
                                        </Link>
                                    </td>
                                    <td>
                                        <Button
                                        variant="danger"
                                        onClick={() => this.handleDelete(sch)}>
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

export default AllSchedulesList;
