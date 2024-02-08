import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ensure the path is correct
import '../App.css';

const Navbar: React.FC = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleLogout = async () => {
        try {
            // Call the backend logout endpoint
            const response = await fetch('http://localhost:8080/logout', {
                method: 'POST',
                credentials: 'include', // Important to include credentials for cookies to be sent
            });
            
            if (response.ok) {
                logout(); // Update the local state to reflect that the user is logged out
                navigate('/login');
            } else {
                // Handle any errors or unsuccessful logout attempts
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    console.log(isLoggedIn)

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand">Job Tracker</Link>
                <button className="navbar-toggler" type="button" onClick={handleNavCollapse} aria-controls="navbarCollapse" aria-expanded={!isNavCollapsed} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        {isLoggedIn ? (
                            <li className="nav-item">
                                <button className="nav-link" onClick={handleLogout}>Logout</button>
                                <Link to='/dashboard' className="nav-link">Dashboard</Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to={'/login'} className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/signup'} className="nav-link">SignUp</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
