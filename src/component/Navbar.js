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
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLogedin(false);
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    Navbar
                </a>
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
                            <a className="nav-link active" aria-current="page" href="/">
                                Home
                            </a>
                        </li>
                        {localStorage.getItem("token") &&<li className="nav-item">
                            <a className="nav-link active" href="/myPost">
                                My Post
                            </a>
                        </li>}
                        {localStorage.getItem("token") && <li className="nav-item">
                            <a className="nav-link active" href="/newPost">
                                New Post
                            </a>
                        </li>}
                        {localStorage.getItem("token") && <li className="nav-item">
                            <a className="nav-link active" href="/folks">
                                Folks
                            </a>
                        </li>}
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
