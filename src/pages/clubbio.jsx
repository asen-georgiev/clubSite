import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {getClubBios} from "../services/clubbioService";
import {Image} from "react-bootstrap";


class Clubbio extends Component {
    constructor(props) {
        super(props);
            this.state={
                clubBio:[]
            }
    }

    async componentDidMount() {
        const bio = await getClubBios();
        const clubBio = [bio]
        this.setState({clubBio});
        console.log(this.state);
    }


    render() {
        return (
            <div>
                <Container fluid={true}>
                    <Row>
                    <h1>Warriors Karate Club</h1>
                    </Row>
                    <Row>
                        {this.state.clubBio.map(item =>(
                            item.data.map(bio=>{
                                return(
                                    <div className="clearfix" key={bio._id}>
                                        <Image src={require('../assets/images/aaa2.JPG')} width="300" height="auto"/>
                                    <h2>{bio.bioTitle}</h2>
                                    <p>{bio.bioText}</p>
                                    </div>
                                )
                            })
                        ))}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Clubbio;
