import React, {Component} from 'react';
import {getUsers} from "../services/userService";

class News extends Component {

    constructor(props) {
        super(props);
        this.state={
            user:[],
        }
    }

    async componentDidMount() {
        const data = await getUsers();
        const user = [data]
        console.log('before user')
        this.setState({user});
        console.log(this.state);
    }



    render() {
        return (
            <div>
                <ul>
                    {this.state.user.map((user, key) => {
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
            </div>
        );
    }
}

export default News;
