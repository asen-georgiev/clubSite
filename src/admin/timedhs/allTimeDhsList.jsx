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
import _ from 'lodash'
import {deleteTimeDH, getTimeDHs} from "../../services/timedhService";
import ListGroupComp from "../../components/listGroupComp";
import Paginate from "../../components/paginate";
import {paginateFunct} from "../../services/paginateFunct";


class AllTimeDhsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timedhs: [],
            list: [],
            selectedDay:'',
            daysPerPage: 4,
            currentPage: 1
        }
    }

    async componentDidMount() {
        const {data: timedhs} = await getTimeDHs();
        //Създава нов масив, който съдържа обекти уникални по стойност 'day'
        const uniqList = _.uniqBy(timedhs,'day');
        const list = [{day:'Everyday'},...uniqList];
        this.setState({timedhs,list});
        console.log(this.state);
    }


    handleDelete = async (timedh) => {
        const allTimeDhs = this.state.timedhs;
        const timedhs = allTimeDhs.filter(tim => tim._id !== timedh._id);
        this.setState({timedhs});

        try {
            await deleteTimeDH(timedh._id);
        } catch (e) {
            if (e.response && e.response.status === 404)
                console.log('TimeDh with the given ID was not found');
            toast.error('This Time:day/hour has been deleted already!');
            this.setState({timedhs: allTimeDhs});
        }
    }

    handleDaySort = (day) => {
        this.setState({selectedDay: day, currentPage:1});
    }

    handlePageChange = (pageNumber) => {
        this.setState({currentPage: pageNumber});
    }

    adminRedirect = () => {
        this.props.history.push("/admin");
    }


    render() {
        //If selectedDay is true then apply filter where day property is equal to selectedDayProperty
        //We are checking for the day and id property so EVERYDAY object don't have ID so can
        //Render all the days.
        const filteredByDay = this.state.selectedDay && this.state.selectedDay._id
            ? this.state.timedhs.filter(d => d.day === this.state.selectedDay.day)
            : this.state.timedhs;

        const paginatedDays = paginateFunct(filteredByDay,this.state.daysPerPage,this.state.currentPage);

        return (
            <div>
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col style={{marginBottom: 150}}>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>All Days / Hours list:</h3>
                            </Row>
                            <Card className="admin-maincard">
                                <Card.Header className="d-flex flex-row justify-content-between">
                                    <Button className="admin-button-update" onClick={this.adminRedirect}>
                                        BACK TO ADMIN PANEL
                                    </Button>
                                    <Paginate
                                        className="m-0"
                                        itemsCount={filteredByDay.length}
                                        itemsPerPage={this.state.daysPerPage}
                                        currentPage={this.state.currentPage}
                                        onPageChange={this.handlePageChange}/>
                                </Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover className="admin-maincard">
                                        <thead>
                                        <tr>
                                            <th>Course day</th>
                                            <th>Course hour</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {paginatedDays.map(tim => {
                                            return (
                                                <tr key={tim._id}>
                                                    <td>{tim.day}</td>
                                                    <td>{tim.hour}</td>
                                                    <td>
                                                        <Link
                                                            className="admin-button-submit btn"
                                                            to={`/admin/timedhslist/${tim._id}`}>
                                                            Update
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            className="admin-button-delete"
                                                            onClick={() => this.handleDelete(tim)}>
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
                                    <ListGroupComp
                                    items={this.state.list}
                                    selectedItem={this.state.selectedDay}
                                    valueProperty="_id"
                                    textProperty="day" //Така правим ЛистГруп интерфейса флексибъл,
                                    //Не всички обекти имат пропърти ден или т.н.
                                    onListSelect={this.handleDaySort}/>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AllTimeDhsList;
