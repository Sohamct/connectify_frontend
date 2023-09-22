import './App.css';
import { Signup } from './component/Signup';
import { Login } from './component/Login';
import { Navbar } from './component/Navbar';
import { Home } from './component/Home';
import { Alert } from './component/Alert';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NewPost } from './component/NewPost';
import { GetPost } from './component/GetPost';
import { GetFolks } from './component/GetFolks';
import axios from 'axios';
// made by har and soham

function App() {
  const [alert, setAlert] = useState();
  const [userName, setUserName] = useState(null);

const showAlert = (message, key) => {
  setAlert({msg : message, type : key})

  setTimeout(() => {
    setAlert(null);
  }, 1500)
}

const getUser = async () => {
  console.log('getUser function called');
  try {
      const host = 'http://localhost:5500';
      const token = localStorage.getItem('token');

      if (token) {
          const res = await axios.get(`${host}/api/auth/getUser`, {
              headers: {
                  'auth-token': token,
              },
          });
         console.log(res.data.status);
         if (res.data.status) {
          console.log('User data received:', res.data.userName); // Add this line
          setUserName(res.data.userName);
      } else {
          console.log('User data not available'); // Add this line
          setUserName(null);
      }
      
      }else{
        setUserName(null)
      }
      
  } catch (error) {
      setUserName(null)
      console.error(error);
  }
};
useEffect(()=>{
  getUser();
})
  return (
    <>
      <Router>
          <Navbar userName={userName} getUser={getUser}/>
          <Alert alert={alert} element={<Login showAlert={showAlert}/>}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
              <Route exact path="/newPost" element={<NewPost showAlert={showAlert}/>}/>
              <Route exact path="/myPost" element={<GetPost showAlert={showAlert}/>}/>
              <Route exact path="/Folks" element={<GetFolks showAlert={showAlert}/>}/>
              {/* <Route exact path="/others" element={<GetOthers showAlert={showAlert}/>}/> */}
              
            </Routes>
          </div>
        </Router>
    </>
  );
}

export default App;
