import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class Biographs extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.clubBios.map(cb=>{
                    return(
                        <Row>
                            <h1>{cb.bioTitle}</h1>
                            <h3>{cb.bioText}</h3>
                        </Row>
                    )
                })}
            </div>
        );
    }
}

export default Biographs;
