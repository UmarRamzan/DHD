import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react';

import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import NavBar from './pages/NavBar'
import PatientInfo from './pages/PatientInfo';
import DoctorInfo from './pages/DoctorInfo'
import HospitalInfo from './pages/HospitalInfo';
import DoctorPublic from './pages/DoctorPublic';
import HospitalPublic from './pages/HospitalPublic';
import Settings from './pages/Settings';
import PatientSettings from './pages/PatientSettings';
import Bookings from './pages/Bookings';
import Reviews from './pages/Reviews';

import { UserContext } from './UserContext';

function App() {

  const [accountID, setAccountID] = useState(null)
  const [accountType, setAccountType] = useState(null)
  const [accountName, setAccountName] = useState(null)
  
  const userState = {accountID, setAccountID, accountType, setAccountType, accountName, setAccountName}

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{accountID, setAccountID, accountType, setAccountType, accountName,setAccountName}}>
          <NavBar />
          <div className="content">
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/home" element={<Home/>}></Route>

                <Route exact path="/signup" element={<Signup/>}></Route>
                <Route exact path="/signup/patient" element={<PatientInfo/>}></Route>
                <Route exact path="/signup/doctor" element={<DoctorInfo/>}></Route>
                <Route exact path="/signup/hospital" element={<HospitalInfo/>}></Route>

                <Route exact path="/login" element={<Login/>}></Route>

                <Route exact path="/bookings" element={accountID? <Bookings/> : <Login/> }></Route>

                <Route exact path="/doctorPublic" element={<DoctorPublic/>}></Route>
                <Route exact path="/hospitalPublic" element={<HospitalPublic/>}></Route>

                <Route exact path="/settings" element={accountID? <Settings/> : <Login/>}></Route>
                <Route exact path="/patientSettings" element={<PatientSettings/>}></Route>
                <Route exact path="/reviews" element={<Reviews/>}></Route>



                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
          </div>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
