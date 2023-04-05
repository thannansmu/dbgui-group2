import './App.css';
import axios from 'axios';
import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import About from './components/pages/About';
import LogInorCreateAcctOption from './components/LogInorCreateAcctOption';




function App() {

  const url = 'http://localhost:8000'

  const checkAPI = () => {
    axios.get(url + '/').then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const user = {
    "first": "Hayden",
    "last": "Center",
    "age": 22,
    "admin": true
  }

  const sendJSON = () => {
    console.log(user)

    axios.put(url + '/parse', user).then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const sendUser = () => {
    axios.post(url + '/user', user).then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const getUsers = () => {
    axios.get(url + '/users').then((res) => {
      alert(JSON.stringify(res.data))
    }).catch((err) => {
      console.log(err)
    })
  }

  const clearUsers = () => {
    axios.put(url + '/users/clear').then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
    <Router>
      <Navbar />
    <Routes> 
      <Route path = '/' element={<Home />} />
      <Route path = '/services-page' element={<Services />} />
      <Route path = '/about-tutors' element={<About />} />
      <Route path = '/sign-up' element={<LogInorCreateAcctOption />} />


    </Routes>
    
    </Router>
      
    </>
  );
}

export default App;
