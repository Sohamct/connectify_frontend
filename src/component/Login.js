import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = (props) => {

  const [credentials, setCredentials] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault(); // form stoping the page reloading.
    
      const host = "http://localhost:5500"
      try {
        const response = await fetch(`${host}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",// 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({ userName: credentials.userName, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
          // save the auth token and redirect
          localStorage.setItem('token', json.authtoken);
          props.showAlert("Logged in Successfullly", "success");
          navigate("/");
        } else {
          props.showAlert(json.error, "danger");
        }
        console.log(json);
      } catch (err) {
        console.log()
        props.showAlert(err, "danger")
      }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <h2 className='my-3 mt-2'> Login To Continue Connectify</h2>
      <form onSubmit={handleClick} >
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">UserName</label>
          <input type="text" className="form-control my-1" id="userName" name='userName' onChange={onChange} value={credentials.userName} aria-describedby="emailHelp" placeholder="Enter username" />

        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control my-1" id="password" name='password' onChange={onChange} value={credentials.password} placeholder="Password" />
        </div>

        <button type="submit" className="btn btn-primary my-2">Login</button>
      </form>
    </div>
  )
}
