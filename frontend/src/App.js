import './App.css';
import axios from 'axios';
import React from 'react';
import {Navbar} from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home, About, Services, LoginForm, CreateAccount, YourAppointments, Schedule_Tutor_Filter, Ask_Question} from './components/pages';
import { LogInorCreateAcctOption } from './components/LogInorCreateAcctOption';
import { ProfilePage } from './components/pages/ProfilePage';
import { TutorProfile } from './components/pages/tutorView';
import { Review_Tutor } from './components/pages';
import { CalendarView } from './components/pages/CalendarView';

function App() {

  const url = 'http://localhost:8000'

  // const checkAPI = () => {
  //   axios.get(url + '/').then((res) => {
  //     alert(res.data)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

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
      <Navbar />
    <Routes> 
      <Route path = '/' element={<Home />} />
      <Route path = '/services-page' element={<Services />} />
      <Route path = '/about-tutors' element={<About />} />
      <Route path = '/sign-up' element={<LogInorCreateAcctOption />} />
      <Route path = '/login' element={<LoginForm />} />
      <Route path = '/create-account' element={<CreateAccount />} />
      <Route path = '/booked-appt' element={<YourAppointments />} />
      <Route path = '/schedule-appt' element={<Schedule_Tutor_Filter />} />
      <Route path = '/ask-question' element={<Ask_Question/>}/>
      <Route path = '/main-student-screen' element={<ProfilePage/>}/>
      <Route path = '/review-tutor' element={<Review_Tutor/>}/>
      <Route path = '/profile' element={<ProfilePage />} />
      <Route path = '/tutor-profile' element={<TutorProfile />} />
      <Route path = '/calendar-view' element={<CalendarView />} />    

    </Routes>
    
    </Router>
      
    </>
  );
}

export default App;
