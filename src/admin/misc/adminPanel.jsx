import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
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
                <Container className="container bg-secondary" fluid={true}>
                    {/*{this.state.loggedUser.map(user => {*/}
                    {/*        return (*/}
                    {/*            <div key={user.data.name}>*/}
                    {/*                <h4>Logged as: {user.data.name}</h4>*/}
                    {/*                {user.data.isAdmin && <h5>Admin rights</h5>}*/}
                    {/*                {!user.data.isAdmin && <h5>No Admin rights</h5>}*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*)}*/}
                    <h4>Logged as: {this.state.loggedUser.name}</h4>
                    {this.state.loggedUser.isAdmin && <h5>Admin rights</h5>}
                    {!this.state.loggedUser.isAdmin && <h5>No Admin rights</h5>}
                    <Table>
                        <thead>
                        <tr>
                            <th>Admin Action</th>
                            <th>Execute Buttons</th>
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
                        </tr>
                        <tr>
                            <td>News</td>
                            <td><Link to="/admin/createnews">Create news</Link></td>
                            <td><Link to="/admin/newslist">News list</Link></td>
                        </tr>
                        <tr>
                            <td>Training Schedules</td>
                            <td><Link to="/admin/createschedule">Create schedule</Link></td>
                            <td><Link to="/admin/scheduleslist">Schedules list</Link></td>
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
                    <Button onClick={this.logoutAdmin}>Logout</Button>
                </Container>
            </div>
        );
    }
}

export default AdminPanel;
