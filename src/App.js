import './App.css';
import { Signup } from './component/Signup';
import { Login } from './component/Login';
import { Navbar } from './component/Navbar';
import { Home } from './component/Home';
import { Alert } from './component/Alert';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
// made by har and soham

function App() {
  const [alert, setAlert] = useState();

const showAlert = (message, key) => {
  setAlert({msg : message, type : key})

  setTimeout(() => {
    setAlert(null);
  }, 2000)
}
  return (
    <>
      <Router>
          <Navbar/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
            </Routes>
          </div>
        </Router>
    </>
  );
}

export default App;
