import React, {Component} from 'react';
import {Route, Redirect, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Navigation from "./components/navigation";
import Container from 'react-bootstrap/Container';
import News from "./pages/news";
import LoginForm from "./admin/loginForm";
import AdminPanel from "./admin/adminPanel";
import RegisterUserForm from "./admin/registerUserForm";
import ImageUpload from "./admin/imageUpload";
import {getCurrentUser} from "./services/loginService";
import Contacts from "./pages/contacts";
import CreateNewsForm from "./admin/createNewsForm";
import Schedule from "./pages/schedule";
import CreateScheduleForm from "./admin/createScheduleForm";


class App extends Component {

    constructor(props) {
        super(props);
        this.state={
            user:""
        }
    }

    componentDidMount() {
        const user = getCurrentUser();
        this.setState({user});
    }

    render() {
        return (
            <div>
                <ToastContainer/>
                <Container className="container bg-light p-0" fluid={true}>
                    <Navigation/>
                    <Switch>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/news" component={News}/>
                        <Route path="/contacts" component={Contacts}/>
                        <Route path="/schedule" component={Schedule}/>
                        {this.state.user &&
                            <Switch>
                                <Route exact path="/admin/uploadimage" component={ImageUpload}/>
                                <Route exact path="/admin/registeruser" component={RegisterUserForm}/>
                                <Route exact path="/admin/createnews" component={CreateNewsForm}/>
                                <Route exact path="/admin/createschedule" component={CreateScheduleForm}/>
                                <Route exact path="/admin" component={AdminPanel}/>
                            </Switch>}
                    </Switch>
                </Container>
            </div>
        );
    }
}

export default App;
