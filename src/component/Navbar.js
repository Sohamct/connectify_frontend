import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {

    const navigate = useNavigate();

    const [isLogedin, setIsLogedin] = useState(false);

    useEffect(() => {
        const info = window.localStorage.getItem("token");
        if (info) {
            setIsLogedin(true);
        }
        console.log('isLogedin:', isLogedin); 
        console.log('Token:', info);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLogedin(false);
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Navbar </Link>
                
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
                                Home </Link>
                            
                        </li>
                        {localStorage.getItem("token") &&<li className="nav-item">
                            <Link className="nav-link active" to="/myPost">
                                My Post </Link>
                            
                        </li>}
                        {localStorage.getItem("token") && <li className="nav-item">
                            <Link className="nav-link active" to="/newPost">
                                New Post </Link>
                            
                        </li>}
                        {localStorage.getItem("token") && <li className="nav-item">
                            <Link className="nav-link active" to="/folks">
                                Folks </Link>
                            
                        </li>}
                        {/* {localStorage.getItem("token") && <li className="nav-item">
                            <Link className="nav-link active" to="/others">
                                Others </Link>
                            
                        </li>} */}
                    </ul>

                    <div className="ml-auto d-flex align-items-center">
                        <form className="d-flex mr-2">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>

                        {!localStorage.getItem("token") ? <form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                        </form> : <button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </div>
        </nav>
    );
}
