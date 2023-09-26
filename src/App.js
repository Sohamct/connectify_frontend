import './App.css';
import { Signup } from './component/Signup';
import { Login } from './component/Login';
import { Navbar } from './component/Navbar';
import { Home } from './component/Home';
import { Alert } from './component/Alert';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import { NewPost } from './component/NewPost';
import { GetPost } from './component/GetPost';
import { GetFolks } from './component/GetFolks';
import {GlobalProvider} from './component/GlobalState';

// made by har and soham

function App() {
  const [alert, setAlert] = useState();
  
const showAlert = (message, key) => {
  setAlert({msg : message, type : key})

  setTimeout(() => {
    setAlert(null);
  }, 1500)
}

  return (
    <GlobalProvider>
      <Router>
          <Navbar/>
          <Alert alert={alert} element={<Login showAlert={showAlert}/>}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
              <Route exact path="/newPost" element={<NewPost showAlert={showAlert}/>}/>
              <Route exact path="/myPost" element={<GetPost showAlert={showAlert}/>}/>
              <Route exact path="/Folks" element={<GetFolks showAlert={showAlert}/>}/>
              
            </Routes>
          </div>
        </Router>
    </GlobalProvider>
  );
}

export default App;
