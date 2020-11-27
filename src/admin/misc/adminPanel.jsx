import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Link, Route, Switch} from "react-router-dom";
import {loginUser, logoutUser, getCurrentUser} from "../../services/loginService";
import {getLoggedUser} from "../../services/userService";
import '../../css/admin.css';
import Card from "react-bootstrap/Card";


class AdminPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedUser: ''
        }
    }


    async componentDidMount() {
        const {data: loggedUser} = await getLoggedUser();
        // const loggedUser = [user];
        this.setState({loggedUser});
        console.log(this.state);
    }


    logoutAdmin = () => {
        logoutUser();
        this.props.history.push("/login");
    }

    render() {
        return (
            <div>
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col>
                            <Row className="admin-row d-flex justify-content-start">
                                <h3>Logged as : {this.state.loggedUser.name} - </h3>
                                &ensp;{this.state.loggedUser.isAdmin && <h3>the user has Admin rights</h3>}

                                &ensp;{!this.state.loggedUser.isAdmin &&
                            <div>
                                <h3>the user has No Admin rights</h3>
                                <Button
                                    className="admin-button-delete"
                                    onClick={this.logoutAdmin}>
                                    LOGOUT
                                </Button>
                            </div>
                            }
                            </Row>

                            {this.state.loggedUser.isAdmin &&
                            <Card className="admin-maincard mt-5">
                                <Card.Header>
                                    <Button
                                        className="admin-button-delete"
                                        onClick={this.logoutAdmin}>
                                        LOGOUT
                                    </Button>
                                </Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover className="admin-maincard">
                                        <thead>
                                        <tr>
                                            <th>Components</th>
                                            <th>Create new</th>
                                            <th>To lists</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>USERS</td>
                                            <td><Link className="admin-button-submit btn" to="/admin/registeruser">Register
                                                user</Link></td>
                                            <td><Link className="admin-button-update btn" to="/admin/userslist">Users
                                                list</Link></td>
                                        </tr>
                                        <tr>
                                            <td>IMAGES</td>
                                            <td><Link className="admin-button-submit btn" to="/admin/uploadimage">Upload
                                                image</Link></td>
                                            <td><Link className="admin-button-update btn" to="/admin/imageslist">Images
                                                list</Link></td>
                                        </tr>
                                        <tr>
                                            <td>NEWS</td>
                                            <td><Link className="admin-button-submit btn" to="/admin/createnews">Create
                                                news</Link></td>
                                            <td><Link className="admin-button-update btn" to="/admin/newslist">News
                                                list</Link></td>
                                        </tr>
                                        <tr>
                                            <td>COURSES</td>
                                            <td><Link className="admin-button-submit btn" to="/admin/createcourse">Create
                                                course</Link></td>
                                            <td><Link className="admin-button-update btn" to="/admin/courseslist">Courses
                                                list</Link></td>
                                        </tr>
                                        <tr>
                                            <td>DAYS/HOURS</td>
                                            <td><Link className="admin-button-submit btn" to="/admin/createtimedh">Create
                                                day/hour</Link></td>
                                            <td><Link className="admin-button-update btn" to="/admin/timedhslist">Days/Hours
                                                list</Link></td>
                                        </tr>
                                        <tr>
                                            <td>TIMETABLES</td>
                                            <td><Link className="admin-button-submit btn" to="/admin/createtimetable">Create
                                                timetable</Link></td>
                                            <td><Link className="admin-button-update btn" to="/admin/timetableslist">Timetables
                                                list</Link></td>
                                        </tr>
                                        <tr>
                                            <td>SPORT EVENTS</td>
                                            <td><Link className="admin-button-submit btn" to="/admin/createevent">Create
                                                sport event</Link></td>
                                            <td><Link className="admin-button-update btn" to="/admin/eventslist">Events
                                                list</Link></td>
                                        </tr>
                                        <tr>
                                            <td>CLUB BIOS</td>
                                            <td><Link className="admin-button-submit btn" to="/admin/createclubbio">Create
                                                club bio</Link></td>
                                            <td><Link className="admin-button-update btn" to="/admin/bioslist">Club Bios
                                                list</Link></td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AdminPanel;
