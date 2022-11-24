import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import logo from './logo.svg';

import './App.css';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import NavBar from './pages/NavBar'

function App() {
  return (  
    <Router>
      <div className="App">
        <NavBar/>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/signup" element={<Signup/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route exact path="/home" element={<Home/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
