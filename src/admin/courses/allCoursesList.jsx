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
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>All Courses list :</h3>
                            </Row>
                            <Card className="admin-maincard overflow-auto">
                                <Card.Header>
                                    <Button
                                        className='admin-button-update'
                                        onClick={this.adminRedirect}>
                                        BACK TO ADMIN PANEL
                                    </Button>
                                </Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover className="admin-maincard">
                                        <thead>
                                        <tr>
                                            <th>Course name</th>
                                            <th>Information</th>
                                            <th>Price</th>
                                            <th>Age range</th>
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
                                                        <Link
                                                            className="admin-button-submit btn"
                                                            to={`/admin/courseslist/${crs._id}`}>
                                                            Update
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            className="admin-button-delete"
                                                            onClick={() => this.handleDelete(crs)}>
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

export default AllCoursesList;
