import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {loginUser, logoutUser, getCurrentUser} from "../services/loginService";


class AdminPanel extends Component {


    logoutAdmin = () => {
        logoutUser();
        this.props.history.push("/login");
    }

    render() {
        return (
            <div>
                <Container>
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
                        </tbody>
                    </Table>
                    <Button onClick={this.logoutAdmin}>Logout</Button>
                </Container>

            </div>
        );
    }
}

export default AdminPanel;
