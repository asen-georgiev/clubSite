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
import {getCurrentUser, logoutUser} from "./services/loginService";
import Contacts from "./pages/contacts";
import CreateNewsForm from "./admin/createNewsForm";
import Schedule from "./pages/schedule";
import CreateScheduleForm from "./admin/createScheduleForm";
import Events from "./pages/events";
import CreateEventForm from "./admin/createEventForm";
import Clubbio from "./pages/clubbio";
import CreateClubBioForm from "./admin/createClubBioForm";
import AllUsersList from "./admin/allUsersList";
import UpdateUserForm from "./admin/updateUserForm";
import AllClubBioList from "./admin/allClubBioList";
import UpdateClubBioForm from "./admin/updateClubBioForm";


class App extends Component {

    constructor(props) {
        super(props);
        this.state={
            user:''
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
                        <Route path="/events" component={Events}/>
                        <Route path="/clubbio" component={Clubbio}/>
                        {this.state.user &&
                            <Switch>
                                <Route exact path="/admin/uploadimage" component={ImageUpload}/>
                                <Route exact path="/admin/registeruser" component={RegisterUserForm}/>
                                <Route exact path="/admin/userslist/:id" component={UpdateUserForm}/>
                                <Route exact path="/admin/userslist" component={AllUsersList}/>
                                <Route exact path="/admin/createnews" component={CreateNewsForm}/>
                                <Route exact path="/admin/createschedule" component={CreateScheduleForm}/>
                                <Route exact path="/admin/createevent" component={CreateEventForm}/>
                                <Route exact path="/admin/createclubbio" component={CreateClubBioForm}/>
                                <Route exact path="/admin/bioslist/:id" component={UpdateClubBioForm}/>
                                <Route exact path="/admin/bioslist" component={AllClubBioList}/>
                                <Route exact path="/admin" component={AdminPanel}/>
                            </Switch>}
                    </Switch>
                </Container>
            </div>
        );
    }
}

export default App;
