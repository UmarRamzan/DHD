import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import logo from './logo.svg';

import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (  
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Signup/>}></Route>
            <Route exact path="/signup" element={<Signup/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
