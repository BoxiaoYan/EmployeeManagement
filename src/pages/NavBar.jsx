import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const userId = useSelector(state => state.user.id);
    const Userposition = useSelector(state => state.user.position);
    console.log("current id: " + userId);
    console.log("current position: " + Userposition);
    return (

        <nav>
            <ul>
                <li className="navbar-title">Employee Management</li>
                {Userposition === 'employee' ? (
                    <>

                        <li>
                            <Link to="/personal-information">Personal Information</Link>
                        </li>
                        <li>
                            <Link to="/visa-status-management">Visa Status Management</Link>
                        </li>
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                    </>
                ) : Userposition === 'hr' ? (
                    <>
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
                    </>
                ) : null}
            </ul>
        </nav>
    );
};

export default Navbar;
