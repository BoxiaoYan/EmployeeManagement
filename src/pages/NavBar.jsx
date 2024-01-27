import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const position = useSelector((state) => state.user.user.position);
    const username = useSelector((state) => state.user.user.username);

    console.log("current position: " + position);
    console.log("current username: " + username);


    return (

        <nav>
            <ul>
                <li className="navbar-title">Employee Management</li>
                {position === 'employee' ? (
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
                ) : position === 'hr' ? (
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
