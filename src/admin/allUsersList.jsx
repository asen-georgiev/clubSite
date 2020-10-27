import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {getUsers} from "../services/userService";
import {Button} from "react-bootstrap";

class AllUsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[]
        }
    }

    async componentDidMount() {
        const data = await getUsers();
        const users = [data];
        this.setState({users});
    }

    render() {
        return (
            <div>
                <Container fluid={true}>
                    <h1>All Users</h1>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin rights</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map(user => (
                            user.data.map(usr =>{
                                return(
                                    <tr key={usr._id}>
                                        <td>{usr.name}</td>
                                        <td>{usr.email}</td>
                                        {usr.isAdmin && <td>admin</td>}
                                        {!usr.isAdmin && <td>not admin</td>}
                                        <td><Button>Update user</Button></td>
                                        <td><Button variant="danger">Delete user</Button></td>
                                    </tr>
                                )
                            })
                        ))}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default AllUsersList;
