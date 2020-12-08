import React, {Component} from 'react';
import '../../css/admin.css';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {deleteEmail, getEmails} from "../../services/emailService";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";

class AllEmailsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emails: []
        }
    }

    async componentDidMount() {
        const {data: emails} = await getEmails();
        this.setState({emails});
        console.log(this.state);
    }


    handleDelete = async (email) =>{
        const allEmails = this.state.emails;
        const emails = allEmails.filter(em => em._id !== email._id);
        this.setState({emails});

        try{
            await deleteEmail(email._id);
        }
        catch (e) {
            if (e.response && e.response.status === 404)
                console.log("Email with the given ID was not found!");
            toast.error("This Email has already been deleted!");
            this.setState({events: allEmails});
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
                                <h3>All recieved emails list :</h3>
                            </Row>
                            <Card className="admin-maincard"><Card.Header>
                                <Button className="admin-button-update" onClick={this.adminRedirect}>
                                    BACK TO ADMIN PANEL
                                </Button>
                            </Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover className="admin-maincard">
                                        <thead>
                                        <tr>
                                            <th>Sender</th>
                                            <th>Email</th>
                                            <th>Subject</th>
                                            <th>Message</th>
                                            <th>Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.emails.map(email => {
                                            return (
                                                <tr>
                                                    <td>{email.fullname}</td>
                                                    <td>{email.email}</td>
                                                    <td>{email.subject}</td>
                                                    <td>{email.message}</td>
                                                    <td>
                                                        <Button
                                                            className="admin-button-delete"
                                                            onClick={() => this.handleDelete(email)}>
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

export default AllEmailsList;
