import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { Login } from './pages/login.js'
import { Signup } from './pages/signup.js'
import { Home } from './pages/home.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;