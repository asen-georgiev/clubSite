import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import {getUsers} from "../services/userService";
import {getImages} from "../services/imageService";
import {Image} from "react-bootstrap";
import Col from "react-bootstrap/Col";


class News extends Component {

    constructor(props) {
        super(props);
        this.state={
            user:[],
            images:[]
        }
    }

    async componentDidMount() {
        const gallery = await getImages();
        const images = [gallery]

        const data = await getUsers();
        const user = [data]

        console.log('before user')
        this.setState({user,images});
        console.log(this.state);

    }


    render() {
        return (
            <div>
                <ul>
                    {this.state.user.map((user, index) => {
                        return (
                            <ul>
                            <li key={user.data[0].name}>
                                <div>{user.data[0].name}</div>
                            </li>
                                <li key={user.data[0].email}>
                                    <div>{user.data[0].email}</div>
                                </li>
                            </ul>
                        );
                    })}
                </ul>
                <Row>
                    {this.state.images.map(image=> (
                        image.data.map(pic=> {
                            return (
                                <Col>
                                <Image src={"http://localhost:3900/"+pic} width="400" height="auto"/>
                                </Col>
                            )
                        }))
                    )};
                </Row>
            </div>
        );
    }
}

export default News;
