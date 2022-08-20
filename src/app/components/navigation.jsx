import React from "react";
// import { a } from "react-router-dom";

const Navigation = () => {
    return (
        <>
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link active" href="/mainPage">
                        Main
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/login">
                        Login
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/users">
                        Users
                    </a>
                </li>
            </ul>
        </>
    );
};

export default Navigation;
