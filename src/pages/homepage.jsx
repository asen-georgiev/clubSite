import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import '../css/homepage.css';


class Homepage extends Component {

    render() {
        return (
            <div>
                <Container className="home-bckg" fluid={true}>
                    <iframe
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIseido-Shotokan-Karate-club-142528162447145%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                        width="340" height="500" style={{border:"none", overflow:"hidden"}} scrolling="no" frameBorder="0"
                        allowFullScreen="true"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                </Container>
            </div>
        );
    }
}

export default Homepage;
