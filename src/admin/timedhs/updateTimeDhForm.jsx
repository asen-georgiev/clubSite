import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Joi from "joi";
import {toast} from "react-toastify";
import {FormLabel} from "react-bootstrap";
import {getTimeDH, updateTimeDH} from "../../services/timedhService";
import {updateSchedule} from "../../services/scheduleService";


class UpdateTimeDhForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timedh:{
                day:'',
                hour:''
            },
            errors:{},
            isDisabled:false
        }
    }


    schema = Joi.object({
        _id: Joi.string(),
        day: Joi.string()
            .required()
            .min(5)
            .max(20),
        hour: Joi.string()
            .required()
            .min(2)
            .max(20)
    });


    async componentDidMount() {
        await this.populateTimeDH();
        console.log(this.state.timedh);
    }


    async populateTimeDH(){
        try{
            const timedhId = this.props.match.params.id;
            const {data:timedh} = await getTimeDH(timedhId);
            this.setState({timedh: this.mapToViewModel(timedh)});

        }
        catch (e) {
            if(e.response && e.response === 404)
                console.log('There is no Time:day/hour with the given ID');
        }
    }



    handleSubmit = async(event) =>{
        event.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if(errors) return;

        const obj = {
            day: this.state.timedh.day,
            hour: this.state.timedh.hour
        };

        this.setState({isDisabled: true});
        toast.success('Time:day/hour update was successful!');
        await updateTimeDH(obj,this.state.timedh._id);
    }




    handleChange = (event) =>{
        const timedh = {...this.state.timedh};
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        timedh[name] = value;
        this.setState({
            timedh
        });
    }



    mapToViewModel(timedh){
       return {
           _id: timedh._id,
           day: timedh.day,
           hour: timedh.hour
       };
    }


    validate = () =>{
        const obj = {
            day: this.state.timedh.day,
            hour: this.state.timedh.hour
        };

        const options = {abortEarly:false};
        const result = this.schema.validate(obj,options);
        console.log(result);

        if(!result.error) return null;

        const errors = {};
        for(let item of result.error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }



    adminRedirect = () => {
        this.props.history.push("/admin/timedhslist");
    }

    render() {
        return (
            <div>
                <Container className="container bg-light" fluid={true}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <FormLabel>
                                Course Day
                            </FormLabel>
                            <FormControl
                                autoFocus={true}
                                name="day"
                                type="text"
                                value={this.state.timedh.day}
                                placeholder="Enter the day for the course"
                                onChange={this.handleChange}/>
                            {this.state.errors.day &&
                            <p className="text-danger pt-2">
                                {this.state.errors.day}
                            </p>}
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>
                                Course Hour
                            </FormLabel>
                            <FormControl
                                name="hour"
                                type="text"
                                value={this.state.timedh.hour}
                                placeholder="Enter the hour for the course"
                                onChange={this.handleChange}/>
                            {this.state.errors.hour &&
                            <p className="text-danger pt-2">
                                {this.state.errors.hour}
                            </p>}
                        </FormGroup>
                        <Row>
                            <Col md={4}>
                                <Button variant="primary" type="submit" disabled={this.state.isDisabled}>
                                    Update
                                </Button>
                            </Col>
                            <Col md={{span:4,offset:4}}>
                                <Button variant="primary" onClick={this.adminRedirect}>
                                    Back to Time:days/hours list
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default UpdateTimeDhForm;
