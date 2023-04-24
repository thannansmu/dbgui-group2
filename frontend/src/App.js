import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import {Navbar} from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home, About, Services, LoginForm, CreateAccount, YourAppointments, Schedule_Tutor_Filter, Ask_Question} from './components/pages';
import { LogInorCreateAcctOption } from './components/LogInorCreateAcctOption';
import { ProfilePage } from './components/pages/ProfilePage';
import { TutorProfile, TutorProfileStudent } from './components/pages/tutorView';
import { Review_Tutor } from './components/pages';
import { CalendarView } from './components/pages/CalendarView';
import { TutorForm } from './components/createAccount';
import {ScheduleTutorFilter} from './components/pages/Schedule_Tutor_Filter';
import { ReportUser } from './components/pages/ReportUser';
import { AdminPage } from './components/pages/AdminPage'; // Make sure the path is correct
import { DeleteUser } from './components/pages';
import {ViewReports} from './components/pages/ViewReports';



function App() {


  const url = 'http://localhost:8000'

  const [loggedInUser, setLoggedInUser] = useState('');
  const [viewTutor, setViewTutor] = useState('');


  const checkAPI = () => {
    axios.get(url + '/').then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  // const user = {
  //   "first": "Hayden",
  //   "last": "Center",
  //   "age": 22,
  //   "admin": true
  // }

  // const sendJSON = () => {
  //   console.log(user)

  //   axios.put(url + '/parse', user).then((res) => {
  //     alert(res.data)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  // const sendUser = () => {
  //   axios.post(url + '/user', user).then((res) => {
  //     alert(res.data)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  // const getUsers = () => {
  //   axios.get(url + '/users').then((res) => {
  //     alert(JSON.stringify(res.data))
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  // const clearUsers = () => {
  //   axios.put(url + '/users/clear').then((res) => {
  //     alert(res.data)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  return (
    <>
    <Router>
    <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
    <Routes> 
    <Route path='/user-reports' element={<ViewReports/>} />
    <Route path='/delete-user' element={<DeleteUser/>} />
      <Route path='/admin-page' element={<AdminPage/>} />
      <Route path='/report-user' element={<ReportUser/>} />
      <Route path = '/' element={<Home />} />
      <Route path = '/services-page' element={<Services />} />
      <Route path = '/about-tutors' element={<About />} />
      <Route path = '/sign-up' element={<LogInorCreateAcctOption />} />
      <Route path="/login" element={<LoginForm setLoggedInUser={setLoggedInUser} />} />
      <Route path = '/create-account' element={<CreateAccount />} />
      <Route path = '/booked-appt' element={<YourAppointments />} />
      <Route path = '/schedule-appt' element={<Schedule_Tutor_Filter setViewTutor={setViewTutor} />} />
      <Route path = '/ask-question' element={<Ask_Question/>}/>
      <Route path = '/main-student-screen' element={<ProfilePage/>}/>
      <Route path = '/review-tutor:username' element={<Review_Tutor loggedInUser={loggedInUser} />}/>
      <Route path="/profile" element={<ProfilePage loggedInUser={loggedInUser} />} />
      <Route path = '/tutor-profile' element={<TutorProfile />} />
      <Route path='/calendar-view/:username' element={<CalendarView loggedInUser={loggedInUser} />} />
      <Route path='/tutor-form/:username' element={<TutorForm />} />
      <Route path='/review-tutor' element={<Review_Tutor loggedInUser={loggedInUser} />} />
      <Route path = '/review-tutor' element={<Review_Tutor/>}/>
      <Route path= '/profile' element={<ProfilePage loggedInUser={loggedInUser} />} />
      <Route path = '/tutor-profile' element={<TutorProfile loggedInUser={loggedInUser} />} />
      <Route path = '/tutor-student' element={<TutorProfileStudent viewTutor={viewTutor} />} />
      <Route path = '/calendar-view' element={<CalendarView />} />

    </Routes>
    
    </Router>
      
    </>
  );
}

export default App;
