import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import '../../css/admin.css';
import {deleteClubBio, getClubBios} from "../../services/clubbioService";


class AllClubBiosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bios: []
        }
    }

    async componentDidMount() {
        const {data: bios} = await getClubBios();
        this.setState({bios});
        console.log(this.state.bios);
    }


    handleDelete = async (clubBio) => {
        const allClubBios = this.state.bios;
        const bios = allClubBios.filter(b => b._id !== clubBio._id);
        this.setState({bios});

        try {
            await deleteClubBio(clubBio._id);
        } catch (e) {
            if (e.response && e.response.status === 404)
                console.log("Club Bio with the given ID was not found!");
            toast.error('This Club Bio has already been deleted');
            this.setState({bios: allClubBios});
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
                                <h3>All Club Bios list :</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Header>
                                    <Button
                                        className="admin-button-update"
                                        onClick={this.adminRedirect}>
                                        BACK TO ADMIN PANEL
                                    </Button>
                                </Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover className="admin-maincard">
                                        <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Text</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.bios.map(bio => {
                                            return (
                                                <tr key={bio._id}>
                                                    <td>{bio.bioTitle}</td>
                                                    <td>
                                                        <div
                                                            className="overflow-auto"
                                                            style={{height: 150}}>
                                                            {bio.bioText}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            className="admin-button-submit btn"
                                                            to={`/admin/bioslist/${bio._id}`}>
                                                            Update
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            className="admin-button-delete"
                                                            onClick={() => this.handleDelete(bio)}>
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

export default AllClubBiosList;
