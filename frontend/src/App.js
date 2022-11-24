import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react';

import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import NavBar from './pages/NavBar'
import { UserContext } from './UserContext';

function App() {

  const [userID, setUserID] = useState(null)

  return (
    <Router>
      <div className="App">
        <NavBar/>
        <div className="content">
          <UserContext.Provider value={{userID, setUserID}}>
            <Routes>   
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/signup" element={<Signup/>}></Route>
                <Route exact path="/login" element={<Login/>}></Route>
                <Route exact path="/home" element={<Home/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
          </UserContext.Provider>
        </div>
      </div>
    </Router>
  );
}

export default App;
