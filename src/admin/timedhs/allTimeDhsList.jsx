import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {deleteTimeDH, getTimeDHs} from "../../services/timedhService";


class AllTimeDhsList extends Component {
    constructor(props) {
        super(props);
            this.state={
                timedhs: []
            }
    }

    async componentDidMount() {
        const{data: timedhs} = await getTimeDHs();
        this.setState({timedhs});
        console.log(this.state.timedhs);
    }



    handleDelete = async(timedh) =>{
        const allTimeDhs = this.state.timedhs;
        const timedhs = allTimeDhs.filter(tim => tim._id !== timedh._id);
        this.setState({timedhs});

        try{
            await deleteTimeDH(timedh._id);
        }
        catch (e){
            if(e.response && e.response.status === 404)
                console.log('TimeDh with the given ID was not found');
            toast.error('This Time:day/hour was already deleted!');
            this.setState({timedhs: allTimeDhs});
        }
    }



    adminRedirect = () => {
        this.props.history.push("/admin");
    }



    render() {
        return (
            <div>
                <Container className="container bg-light" fluid={true}>
                    <h1>All Time:days/hours list</h1>
                    <Row>
                        <Col md={4}>
                            <Button variant="primary" onClick={this.adminRedirect}>
                                Back to Admin Panel
                            </Button>
                        </Col>
                    </Row>
                    <Table  striped bordered hover variant="light">
                        <thead>
                        <tr>
                            <th>Course day</th>
                            <th>Course hour</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.timedhs.map(tim =>{
                            return(
                                <tr key={tim._id}>
                                    <td>{tim.day}</td>
                                    <td>{tim.hour}</td>
                                    <td>
                                        <Link to={`/admin/timedhslist/${tim._id}`}>
                                            Update
                                        </Link>
                                    </td>
                                    <td>
                                        <Button
                                        onClick={() => this.handleDelete(tim)}>
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

export default AllTimeDhsList;
