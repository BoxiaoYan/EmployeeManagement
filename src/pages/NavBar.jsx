import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li className="navbar-title">Employee Management</li>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/employee-profiles">Employee Profiles</Link>
                </li>
                <li>
                    <Link to="/visa-status-management">Visa Status Management</Link>
                </li>
                <li>
                    <Link to="/hiring-management">Hiring Management</Link>
                </li>
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
