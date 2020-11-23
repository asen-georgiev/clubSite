import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Link, Route, Switch} from "react-router-dom";
import {loginUser, logoutUser, getCurrentUser} from "../../services/loginService";
import {getLoggedUser} from "../../services/userService";



class AdminPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedUser: ''
        }
    }


    async componentDidMount() {
        const {data:loggedUser} = await getLoggedUser();
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
                <Container className="container bg-light" fluid={true}>
                    <h4>Logged as: {this.state.loggedUser.name}</h4>
                    {this.state.loggedUser.isAdmin &&
                        <div>
                    <h5>Admin rights</h5>
                    <Table>
                        <thead>
                        <tr>
                            <th>Components</th>
                            <th>Create new</th>
                            <th>To lists</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Users</td>
                            <td><Link to="/admin/registeruser">Register user</Link></td>
                            <td><Link to="/admin/userslist">Users list</Link></td>
                        </tr>
                        <tr>
                            <td>Images</td>
                            <td><Link to="/admin/uploadimage">Upload image</Link></td>
                            <td><Link to="/admin/imageslist">Images list</Link></td>
                        </tr>
                        <tr>
                            <td>News</td>
                            <td><Link to="/admin/createnews">Create news</Link></td>
                            <td><Link to="/admin/newslist">News list</Link></td>
                        </tr>
                        <tr>
                            <td>Courses</td>
                            <td><Link to="/admin/createcourse">Create course</Link></td>
                            <td><Link to="/admin/courseslist">Courses list</Link></td>
                        </tr>
                        <tr>
                            <td>Time:days/hours</td>
                            <td><Link to="/admin/createtimedh">Create time:day/hour</Link></td>
                            <td><Link to="/admin/timedhslist">Time:days/hours list</Link></td>
                        </tr>
                        <tr>
                            <td>Time Tables</td>
                            <td><Link to="/admin/createtimetable">Create time table</Link></td>
                            <td><Link to="/admin/timetableslist">Time tables list</Link></td>
                        </tr>
                        <tr>
                            <td>Sport Events</td>
                            <td><Link to="/admin/createevent">Create sport event</Link></td>
                            <td><Link to="/admin/eventslist">Events list</Link></td>
                        </tr>
                        <tr>
                            <td>Club Bios</td>
                            <td><Link to="/admin/createclubbio">Create club bio</Link></td>
                            <td><Link to="/admin/bioslist">Club Bios list</Link></td>
                        </tr>
                        </tbody>
                    </Table>
                        </div>}
                    {!this.state.loggedUser.isAdmin && <h5>No Admin rights</h5>}
                    <Button onClick={this.logoutAdmin}>Logout</Button>
                </Container>
            </div>
        );
    }
}

export default AdminPanel;
