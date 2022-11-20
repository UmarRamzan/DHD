import {BrowserRouter, Routes, Route} from 'react-router-dom'

import { Login } from './pages/login.js'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
