import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {deleteUser, getUsers} from "../services/userService";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";

class AllUsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[],
        }
    }

    async componentDidMount() {
        const { data: users } = await getUsers();
        // const data = await getUsers();
        // const users = [data];
        this.setState({users});
        console.log(this.state.users);

    }

    handleDelete = async(user) =>{
        const allUsers = this.state.users;
        const users = allUsers.filter(u => u._id !== user._id);
        this.setState({users});
        console.log(users);

        try{
            await deleteUser(user._id);
        }
        catch (e) {
            if(e.response && e.response.status === 404) console.log("User with the given ID was not found!");
            toast.error("This user has already been deleted.");
            this.setState({users: allUsers});
        }
    };


    adminRedirect = () => {
        this.props.history.push("/admin");
    }

    render() {
        return (
            <div>
                <Container fluid={true}>
                    <h1>All Users</h1>
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin rights</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map(usr => {
                                return(
                                    <tr key={usr._id}>
                                        <td>{usr.name}</td>
                                        <td>{usr.email}</td>
                                        {usr.isAdmin && <td>admin</td>}
                                        {!usr.isAdmin && <td>not admin</td>}
                                        <td><Link to={`/admin/userslist/${usr._id}`}>Update user</Link></td>
                                        <td><Button
                                            variant="danger"
                                            onClick={()=>this.handleDelete(usr)}>
                                            Delete user
                                        </Button></td>
                                    </tr>
                                )
                            }
                        )}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default AllUsersList;
