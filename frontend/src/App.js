import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';

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
import DoctorSettings from './pages/DoctorSettings';
import HospitalSettings from './pages/HospitalSettings';
import Bookings from './pages/Bookings';

import { UserContext } from './UserContext';
import { UserState } from './UserState';
import AddRecord from './pages/AddRecord';


function App() {

  const [accountID, setAccountID] = useState(null)
  const [accountType, setAccountType] = useState(null)
  const [accountName, setAccountName] = useState(null)
  
  const userContext = {accountID, setAccountID, accountType, setAccountType, accountName, setAccountName}

  const userState = {
    accountID: accountID,
    setAccountID: setAccountID,
    accountType: accountType,
    setAccountType: setAccountType,
    accountName: accountName,
    setAccountName: setAccountName
  }

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("userState"))

    if (savedState) {
        userState.setAccountID(savedState.accountID)
        userState.setAccountType(savedState.accountType)
        userState.setAccountName(savedState.accountName)

        userState["accountID"] = savedState.accountID
        userState["accountName"] = savedState.accountType
        userState["accountType"] = savedState.accountName
    }

  }, [])

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={userContext}>
          <UserState.Provider value={userState}>
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

                <Route exact path="/bookings" element={accountID? <Bookings/> : <Login/>}></Route>

                <Route exact path="/doctorPublic" element={<DoctorPublic/>}></Route>
                <Route exact path="/hospitalPublic" element={<HospitalPublic/>}></Route>

                <Route exact path="/profile" element={userState.accountType == 'doctor'? <DoctorPublic/> : <HospitalPublic/>}></Route>

                <Route exact path="/settings" element={<Settings/>}></Route>
                <Route exact path="/patientSettings" element={<PatientSettings/>}></Route>
                <Route exact path="/doctorSettings" element={<DoctorSettings/>}></Route>
                <Route exact path="/hospitalSettings" element={<HospitalSettings/>}></Route>
                <Route exact path="/addRecord" element={<AddRecord/>}></Route>

                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
          </div>
          </UserState.Provider>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
