import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {deleteClubBio, getClubBios} from "../services/clubbioService";


class AllClubBioList extends Component {
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
            if (e.response && e.response.status === 404) console.log("Club Bio with the given ID was not found!");
            toast.error('This Club Bio has already been deleted');
            this.setState({allClubBios});
        }
    }

    adminRedirect = () => {
        this.props.history.push("/admin");
    }


    render() {
        return (
            <div>
                <Container fluid={true}>
                    <h1>All Club Bios</h1>
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
                                    <td>{bio.bioText}</td>
                                    <td>
                                        <Link to={`/admin/bioslist/${bio._id}`}>
                                            Update
                                        </Link>
                                    </td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => this.handleDelete(bio)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default AllClubBioList;
