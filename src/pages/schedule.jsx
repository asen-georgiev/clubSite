import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import {getSchedule} from "../services/scheduleService";


class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: []
        }
    }

    async componentDidMount() {
        const schedules = await getSchedule();
        const schedule = [schedules];
        this.setState({schedule});
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <Container>
                    <h1>Training schedule</h1>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>Day</th>
                            <th>Age group</th>
                            <th>Class</th>
                            <th>Hours</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.schedule.map(item => (
                            item.data.map(sch => {
                                return (
                                    <tr key={sch._id}>
                                        <td>{sch.classDay}</td>
                                        <td>{sch.classAge}</td>
                                        <td>{sch.classClass}</td>
                                        <td>{sch.classHour}</td>
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

export default Schedule;
