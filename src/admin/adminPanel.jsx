import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {loginUser, logoutUser, getCurrentUser} from "../services/loginService";
import {getLoggedUser} from "../services/userService";


class AdminPanel extends Component {

    constructor(props) {
        super(props);
        this.state= {
            loggedUser:[]
        }
    }


    async componentDidMount() {
        const user = await getLoggedUser();
        const loggedUser = [user];
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
                <Container>
                    {this.state.loggedUser.map(user =>{
                        return(
                            <div>
                            <h4>Logged as: {user.data.name}</h4>
                        {user.data.isAdmin && <h5>Admin rights</h5>}
                                {!user.data.isAdmin && <h5>No Admin rights</h5>}
                            </div>
                        )}
                    )}

                    <Table>
                        <thead>
                        <tr>
                            <th>Admin Action</th>
                            <th>Execute Button</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Registering New User</td>
                            <td><Link to="/admin/registeruser">Register</Link></td>
                        </tr>
                        <tr>
                            <td>Uploading image</td>
                            <td><Link to="/admin/uploadimage">Upload</Link></td>
                        </tr>
                        <tr>
                            <td>Creating news</td>
                            <td><Link to="/admin/createnews">Create</Link></td>
                        </tr>
                        <tr>
                            <td>Creating training schedule</td>
                            <td><Link to="/admin/createschedule">Create</Link></td>
                        </tr>
                        <tr>
                            <td>Creating sport event</td>
                            <td><Link to="/admin/createevent">Create</Link></td>
                        </tr>
                            <td>Creating club bio</td>
                        <td><Link to="/admin/createclubbio">Create</Link></td>
                        </tbody>
                    </Table>
                    <Button onClick={this.logoutAdmin}>Logout</Button>
                </Container>

            </div>
        );
    }
}

export default AdminPanel;
