import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {getClubBios} from "../services/clubbioService";
import {Image} from "react-bootstrap";
import Biographs from "../components/biographs";


class Clubbio extends Component {
    constructor(props) {
        super(props);
            this.state={
                clubBios:[]
            }
    }

    async componentDidMount() {
        const {data: clubBios} = await getClubBios();
        this.setState({clubBios});
        console.log(this.state);
    }


    render() {
        return (
            <div>
                <Container className="container bg-secondary" fluid={true}>
                    <Image src={require('../assets/images/aaa2.JPG')} width="300" height="auto"/>
                  <Biographs clubBios={this.state.clubBios}/>
                </Container>
            </div>
        );
    }
}

export default Clubbio;
