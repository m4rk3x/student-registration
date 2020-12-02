import React from "react";
import { slide as Menu } from "react-burger-menu";

export default props => {
    return (
        <Menu>
            <a className="menu-item" href="/dashboard">
                Dashboard
        </a>

            <a className="menu-item" href="/studentList">
                Student List
        </a>

            <a className="menu-item" href="/courseList">
                Course List
        </a>

            <a className="menu-item" href="login.html">
                Login
        </a>
        </Menu>
    );
};