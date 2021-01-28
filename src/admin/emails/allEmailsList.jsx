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
import Paginate from "../../components/paginate";
import {paginateFunct} from "../../services/paginateFunct";
import _ from "lodash";
import DropDownComp from "../../components/dropDownComp";

class AllEmailsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emails: [],
            listByEmail: [],
            selectedEmail: {
                email: 'All emails'
            },
            emailsPerPage: 4,
            currentPage: 1
        }
    }

    async componentDidMount() {
        const {data: emails} = await getEmails();
        const uniqByEmail = _.uniqBy(emails, 'email');
        const listByEmail = [{email: 'All emails'}, ...uniqByEmail]
        this.setState({emails, listByEmail});
        console.log(this.state);
    }


    handleDelete = async (email) => {
        const allEmails = this.state.emails;
        const emails = allEmails.filter(em => em._id !== email._id);
        this.setState({emails});

        try {
            await deleteEmail(email._id);
        } catch (e) {
            if (e.response && e.response.status === 404)
                console.log("Email with the given ID was not found!");
            toast.error("This Email has already been deleted!");
            this.setState({events: allEmails});
        }
    }

    handlePageChange = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        });
    }

    handleEmailSort = (email) => {
        this.setState({
            selectedEmail: email,
            currentPage: 1
        });
        console.log(email);
    }


    adminRedirect = () => {
        this.props.history.push("/admin");
    }


    render() {

        const filteredByEmail = this.state.selectedEmail && this.state.selectedEmail._id
            ? this.state.emails.filter(em => em.email === this.state.selectedEmail.email)
            : this.state.emails;

        console.log(filteredByEmail);

        const paginateEmails = paginateFunct(filteredByEmail, this.state.emailsPerPage, this.state.currentPage);

        return (
            <div>
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>All recieved emails list :</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Header className="d-flex flex-row justify-content-between">
                                    <Button className="admin-button-update" onClick={this.adminRedirect}>
                                        BACK TO ADMIN PANEL
                                    </Button>
                                    <Paginate
                                        className="m-0"
                                        itemsCount={filteredByEmail.length}
                                        itemsPerPage={this.state.emailsPerPage}
                                        currentPage={this.state.currentPage}
                                        onPageChange={this.handlePageChange}/>
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
                                        {paginateEmails.map(email => {
                                            return (
                                                <tr key={email._id}>
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
                                <Card.Footer>
                                    <DropDownComp
                                        items={this.state.listByEmail}
                                        valueProperty="email"
                                        textProperty="email"
                                        selectedItem={this.state.selectedEmail}
                                        onSelectDropDown={this.handleEmailSort}
                                    />
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AllEmailsList;
