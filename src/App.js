import React, {Component} from 'react';
import {Route, Redirect, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Navigation from "./components/navigation";
import Container from 'react-bootstrap/Container';
import News from "./pages/news";
import LoginForm from "./admin/misc/loginForm";
import AdminPanel from "./admin/misc/adminPanel";
import RegisterUserForm from "./admin/users/registerUserForm";
import ImageUpload from "./admin/images/imageUpload";
import {getCurrentUser, logoutUser} from "./services/loginService";
import Contacts from "./pages/contacts";
import CreateNewsForm from "./admin/news/createNewsForm";
import Schedule from "./pages/schedule";
import Events from "./pages/events";
import CreateEventForm from "./admin/events/createEventForm";
import Clubbio from "./pages/clubbio";
import CreateClubBioForm from "./admin/bios/createClubBioForm";
import AllUsersList from "./admin/users/allUsersList";
import UpdateUserForm from "./admin/users/updateUserForm";
import AllClubBiosList from "./admin/bios/allClubBiosList";
import UpdateClubBioForm from "./admin/bios/updateClubBioForm";
import AllEventsList from "./admin/events/allEventsList";
import UpdateEventForm from "./admin/events/updateEventForm";
import AllSchedulesList from "./admin/schedules/allSchedulesList";
import UpdateScheduleForm from "./admin/schedules/updateScheduleForm";
import {getLoggedUser} from "./services/userService";
import AllNewsList from "./admin/news/allNewsList";
import UpdateNewForm from "./admin/news/updateNewForm";
import ImagesList from "./admin/images/imagesList";
import Foot from "./components/foot";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {faBullhorn,faToriiGate,faCalendarAlt,faThList,faAddressBook,faHome} from '@fortawesome/free-solid-svg-icons'
import Homepage from "./pages/homepage";
import CreateCourseForm from "./admin/courses/createCourseForm";
import AllCoursesList from "./admin/courses/allCoursesList";
import UpdateCourseForm from "./admin/courses/updateCourseForm";
import CreateTimeDhForm from "./admin/timedhs/createTimeDhForm";
import AllTimeDhsList from "./admin/timedhs/allTimeDhsList";
import UpdateTimeDhForm from "./admin/timedhs/updateTimeDhForm";
import CreateTimeTableForm from "./admin/timetables/createTimeTableForm";
import AllTimeTablesList from "./admin/timetables/allTimeTablesList";
import UpdateTimeTableForm from "./admin/timetables/updateTimeTableForm";
import AllEmailsList from "./admin/emails/allEmailsList";

library.add(fab,faBullhorn,faToriiGate,faCalendarAlt,faThList,faAddressBook,faHome);


class App extends Component {

    constructor(props) {
        super(props);
        this.state={
            user:null
        }
    }

    componentDidMount() {
        const user = getCurrentUser();
        this.setState({user});
        console.log(this.state.user);
    }


    render() {
        return (
            <div>
                <ToastContainer/>
                <Container className="app-bckg p-0" fluid={true}>
                    <Navigation/>
                    <Switch>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/news" component={News}/>
                        <Route path="/contacts" component={Contacts}/>
                        <Route path="/schedule" component={Schedule}/>
                        <Route path="/events" component={Events}/>
                        <Route path="/clubbio" component={Clubbio}/>
                        <Route exact path="/" component={Homepage}/>
                        {this.state.user &&
                            <Switch>
                                <Route exact path="/admin/uploadimage" component={ImageUpload}/>
                                <Route exact path="/admin/imageslist" component={ImagesList}/>
                                <Route exact path="/admin/registeruser" component={RegisterUserForm}/>
                                <Route exact path="/admin/userslist/:id" component={UpdateUserForm}/>
                                <Route exact path="/admin/userslist" component={AllUsersList}/>
                                <Route exact path="/admin/createnews" component={CreateNewsForm}/>
                                <Route exact path="/admin/newslist/:id" component={UpdateNewForm}/>
                                <Route exact path="/admin/newslist" component={AllNewsList}/>
                                <Route exact path="/admin/createevent" component={CreateEventForm}/>
                                <Route exact path="/admin/eventslist/:id" component={UpdateEventForm}/>
                                <Route exact path="/admin/eventslist" component={AllEventsList}/>
                                <Route exact path="/admin/createclubbio" component={CreateClubBioForm}/>
                                <Route exact path="/admin/bioslist/:id" component={UpdateClubBioForm}/>
                                <Route exact path="/admin/bioslist" component={AllClubBiosList}/>
                                <Route exact path="/admin/createcourse" component={CreateCourseForm}/>
                                <Route exact path="/admin/courseslist/:id" component={UpdateCourseForm}/>
                                <Route exact path="/admin/courseslist" component={AllCoursesList}/>
                                <Route exact path="/admin/createtimedh" component={CreateTimeDhForm}/>
                                <Route exact path="/admin/timedhslist/:id" component={UpdateTimeDhForm}/>
                                <Route exact path="/admin/timedhslist" component={AllTimeDhsList}/>
                                <Route exact path="/admin/createtimetable" component={CreateTimeTableForm}/>
                                <Route exact path="/admin/timetablelist/:id" component={UpdateTimeTableForm}/>
                                <Route exact path="/admin/timetableslist" component={AllTimeTablesList}/>
                                <Route exact path="/admin/emailslist" component={AllEmailsList}/>
                                <Route exact path="/admin" component={AdminPanel}/>
                            </Switch>}
                    </Switch>
                    <Foot/>
                </Container>
            </div>
        );
    }
}

export default App;
