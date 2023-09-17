import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Signup = (props) => {

  const [credentials, setCredentials] = useState({ firstName: "", lastName: "", email: "", password: "", cpassword: "", userName: "", gender: "male", dob: new Date() });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { firstName, lastName, email, password, userName, gender, dob } = credentials;
  
    if (password !== credentials.cpassword) {
      props.showAlert("Password Must Match", "danger");
      return;
    }
  
    const host = "http://localhost:5500";
  
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password, userName, gender, dob }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('token', (data.authtoken));
          navigate("/");
          props.showAlert("Account Created Successfully", "success");
        } else {
          props.showAlert("Invalid Credentials", "danger");
        }
      } else {
        const data = await response.json();
        console.error(data);
        props.showAlert("Failed to create account", "danger");
      }
    } catch (error) {
      console.error(error);
      props.showAlert("An unexpected error occurred", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const onChangeDate = (date) => {
    setCredentials({ ...credentials, dob: date });
  };

  return (
    <div className='container'>
      <h2 className='my-2 mt-2'> Create an Account to use Continue Connectify</h2>
      <form onSubmit={handleSubmit} className='my-4'>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">UserName</label>
          <input type="text" className="form-control my-1" id="userName" name='userName' onChange={onChange} value={credentials.userName} aria-describedby="emailHelp" placeholder="Enter UserName" />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">FirstName</label>
          <input type="text" className="form-control my-1" id="firstName" name='firstName' onChange={onChange} value={credentials.firstName} aria-describedby="emailHelp" placeholder="Enter FirstName" />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">LastName</label>
          <input type="text" className="form-control my-1" id="lastName" name='lastName' onChange={onChange} value={credentials.lastName} aria-describedby="emailHelp" placeholder="Enter LastName" />
        </div>
        <label>Select Gender:</label>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="Gender" id="female" onChange={onChange} value={credentials.gender} />
          <label className="form-check-label" htmlFor="female">
            Female
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="Gender" id="male" onChange={onChange} checked />
          <label className="form-check-label" htmlFor="male">
            Male
          </label>
        </div>
        <label>Select Date of Birth:</label>
        <div className="form-group my-2">
          <DatePicker
            selected={credentials.dob}
            onChange={onChangeDate}
            className="form-control my-1"
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control my-1" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" />
        </div>

        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control my-1" id="password" name='password' onChange={onChange} value={credentials.password} placeholder="Password" minLength={5} required />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input type="password" className="form-control my-1" id="cpassword" name='cpassword' onChange={onChange} value={credentials.cpassword} placeholder="Confirm Password" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary my-2">Signup</button>
      </form>

    </div>
  )
}
