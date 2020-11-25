import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {deleteUser, getUsers} from "../../services/userService";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import '../../css/admin.css';
import Card from "react-bootstrap/Card";

class AllUsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        const {data: users} = await getUsers();
        // const data = await getUsers();
        // const users = [data];
        this.setState({users});
        console.log(this.state.users);

    }

    handleDelete = async (user) => {
        const allUsers = this.state.users;
        const users = allUsers.filter(u => u._id !== user._id);
        this.setState({users});

        try {
            await deleteUser(user._id);
        } catch (e) {
            if (e.response && e.response.status === 404) console.log("User with the given ID was not found!");
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
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col style={{marginBottom: 60}}>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>All registered Users table :</h3>
                            </Row>
                            <Card className="admin-maincard">
                            <Card.Header>
                                    <Button onClick={this.adminRedirect}>
                                        BACK TO ADMIN PANEL
                                    </Button>
                            </Card.Header>
                                <Card.Body>
                            <Table striped bordered hover className="admin-maincard">
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
                                        return (
                                            <tr key={usr._id}>
                                                <td>{usr.name}</td>
                                                <td>{usr.email}</td>
                                                {usr.isAdmin && <td>admin</td>}
                                                {!usr.isAdmin && <td>not admin</td>}
                                                <td>
                                                    <Link
                                                        className="admin-button-update btn"
                                                        to={`/admin/userslist/${usr._id}`}>
                                                        Update user
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Button
                                                        className="admin-button-delete"
                                                        onClick={() => this.handleDelete(usr)}>
                                                        Delete user
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                )}
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

export default AllUsersList;
