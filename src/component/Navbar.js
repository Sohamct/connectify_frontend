import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';

export function Navbar(props) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState(' ');

    const handleLogout = async () => {
        // Clear user data and token
        console.log('Logging out');
        localStorage.removeItem('token');
        getUser();
        navigate('/login'); // Redirect to the login page
    };
    
    
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Navbar
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="/navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        { userName && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/myPost">
                                        My Post
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/newPost">
                                        New Post
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/folks">
                                        Folks
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/myProfile">
                                        Profile
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    <div className="ml-auto d-flex align-items-center">
                        

                        {! userName ? (
                            <form className="d-flex" role="search">
                                <Link className="btn btn-primary mx-2" to="/login" role="button">
                                    Login
                                </Link>
                                <Link className="btn btn-primary mx-2" to="/signup" role="button">
                                    Signup
                                </Link>
                            </form>
                        ) : (
                            <div className="d-flex align-items-center">
                                <p className="nav-text mx-4 logged-in-message">Logged in as: { userName}</p>
                                <button className="btn btn-primary" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
}
