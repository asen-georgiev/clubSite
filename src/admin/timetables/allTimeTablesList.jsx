import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import _ from 'lodash';
import {Link} from "react-router-dom";
import '../../css/admin.css';
import Card from "react-bootstrap/Card";
import {deleteTimeTable, getTimeTables} from "../../services/timetableService";
import Paginate from "../../components/paginate";
import {paginateFunct} from "../../services/paginateFunct";
import {getTimeDHs} from "../../services/timedhService";
import DropDownComp from "../../components/dropDownComp";
import {getCourses} from "../../services/courseService";


class AllTimeTablesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timetables: [],
            listByDay: [],
            listByCourse: [],
            selectedDay: 'Everyday',
            selectedCourse: 'All courses',
            tablesPerPage: 5,
            currentPage: 1
        }
    }

    async componentDidMount() {
        const {data: timetables} = await getTimeTables();
        const {data: timedhs} = await getTimeDHs();
        const {data: courses} = await getCourses();
        const uniqByDay = _.uniqBy(timedhs, 'day');
        const listByDay = [{day: 'Everyday'}, ...uniqByDay];
        const listByCourse = [{courseName: 'All courses'}, ...courses]
        this.setState({timetables, listByDay, listByCourse});
        console.log(this.state);
    }


    handleDelete = async (timetable) => {
        const allTimeTables = this.state.timetables;
        const timetables = allTimeTables.filter(tim => tim._id !== timetable._id);
        this.setState({timetables});

        try {
            await deleteTimeTable(timetable._id);
        } catch (e) {
            if (e.response && e.response.status === 404)
                console.log('Timetable with the given ID was not found!');
            toast.error('This time table has already been deleted!');
            this.setState({timetables: allTimeTables});
        }
    }


    handlePageChange = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        });
    }


    handleDaySort = (day) => {
        this.setState(
            {
                selectedDay: day,
                currentPage: 1
            });
        console.log(this.state.selectedDay);
    }


    handleCourseSort = (course) => {
        this.setState(
            {
                selectedCourse: course,
                currentPage: 1
            });
        console.log(this.state.selectedCourse);
    }


    adminRedirect = () => {
        this.props.history.push("/admin");
    }


    render() {

        //Filtering the timetables array by DAY
        const filteredByDay = this.state.selectedDay && this.state.selectedDay._id
            ? this.state.timetables.filter(tt => tt.timedh.day === this.state.selectedDay.day)
            : this.state.timetables;

        //Filtering the FilterByday array for second filtering by coursename
        //It returns filtered array or the whole timetable array so...win win!
        const filteredByCourse = this.state.selectedCourse && this.state.selectedCourse._id
            ? filteredByDay.filter(tt => tt.course.courseName === this.state.selectedCourse.courseName)
            : filteredByDay;

        console.log(filteredByCourse);

        const paginatedTables = paginateFunct(filteredByCourse, this.state.tablesPerPage, this.state.currentPage);

        return (
            <div>
                <Container className="admin-container container" fluid={true}>
                    <Row className="m-0">
                        <Col>
                            <Row className="admin-row d-flex justify-content-start" style={{marginBottom: 50}}>
                                <h3>All Timetables list :</h3>
                            </Row>
                            <Card className="admin-maincard" style={{marginBottom: 270}}>
                                <Card.Header className="d-flex flex-row justify-content-between">
                                    <Button
                                        className="admin-button-update"
                                        onClick={this.adminRedirect}>
                                        BACK TO ADMIN PANEL
                                    </Button>
                                    <Paginate
                                        className="m-0"
                                        itemsCount={filteredByCourse.length}
                                        itemsPerPage={this.state.tablesPerPage}
                                        currentPage={this.state.currentPage}
                                        onPageChange={this.handlePageChange}/>
                                </Card.Header>
                                <Card.Body className="overflow-auto">
                                    <Table striped bordered hover className="admin-maincard">
                                        <thead>
                                        <tr>
                                            <th>Course name</th>
                                            <th>Course day</th>
                                            <th>Course hour</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {paginatedTables.map((timetab, i) => {
                                            return (
                                                <tr key={timetab._id}>
                                                    <td>{timetab.course.courseName}</td>
                                                    <td>{timetab.timedh.day}</td>
                                                    <td>{timetab.timedh.hour}</td>
                                                    <td>
                                                        <Link
                                                            className="admin-button-submit btn"
                                                            to={`/admin/timetablelist/${timetab._id}`}>
                                                            Update
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            className="admin-button-delete"
                                                            onClick={() => this.handleDelete(timetab)}>
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
                                    <Row>
                                        <Col>
                                            <DropDownComp
                                                items={this.state.listByDay}
                                                selectedItem={this.state.selectedDay}
                                                valueProperty="day"
                                                textProperty="day"
                                                onSelectDropDown={this.handleDaySort}/>
                                        </Col>
                                        <Col>
                                            <DropDownComp
                                                items={this.state.listByCourse}
                                                selectedItem={this.state.selectedCourse}
                                                valueProperty="courseName"
                                                textProperty="courseName"
                                                onSelectDropDown={this.handleCourseSort}/>
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AllTimeTablesList;
