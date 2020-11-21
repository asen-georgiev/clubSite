import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {deleteCourse, getCourses} from "../../services/courseService";

class AllCoursesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    async componentDidMount() {
        const {data: courses} = await getCourses();
        this.setState({courses});
        console.log(this.state.courses);
    }

    handleDelete = async (course) => {
        const allCourses = this.state.courses;
        const courses = allCourses.filter(crs => crs._id !== course._id);
        this.setState({courses});

        try {
            await deleteCourse(course._id);
        } catch (e) {
            if (e.response && e.response.status === 404)
                console.log('Course with the given ID was not found');
            toast.error('This course has already been deleted!');
            this.setState({courses: allCourses})
        }
    }


    adminRedirect = () => {
        this.props.history.push("/admin");
    }


    render() {
        return (
            <div>
                <Container className="container bg-secondary" fluid={true}>
                    <h1>All Courses List</h1>
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
                            <th>Course name</th>
                            <th>Course info</th>
                            <th>Course price</th>
                            <th>Course age range</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.courses.map(crs => {
                            return (
                                <tr key={crs._id}>
                                    <td>{crs.courseName}</td>
                                    <td>{crs.courseInfo}</td>
                                    <td>{crs.coursePrice}</td>
                                    <td>{crs.courseAge}</td>
                                    <td>
                                        <Link>Update</Link>
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() => this.handleDelete(crs)}>
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

export default AllCoursesList;
