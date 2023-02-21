import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {

    let location = useLocation();
    const check_login = localStorage.getItem('auth-token');
    let navigate = useNavigate();
    // useEffect(() => {
    //     console.log(location.pathname)
    // }, [location]);
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        navigate('/login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/notes" ? "active" : ""}`} to="/notes">Notes</Link>
                            </li>
                        </ul>
                        {
                            check_login === null && <button className="btn btn-outline-success" type="button">Login</button>
                        }
                        {
                            check_login !== null && <button className="btn btn-outline-success" type="button" onClick={handleLogout}>Logout</button>
                        }
                        
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar