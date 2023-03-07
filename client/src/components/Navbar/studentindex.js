import React from "react";
import UserProfile from "../../pages/session/userprofile";
import { Nav, NavLink, NavMenu, NavHead }
	from "./NavbarElements";
import { Link } from "react-router-dom";
import axios from "axios";

export default function StudentNavbar() {
    return (
        <>
        <Nav>
            
            <NavMenu>
                <NavHead to="/">
                    STUDENTHUB
                </NavHead>
                <NavLink to="/about" activeStyle>
                    About
                </NavLink>
                <NavLink to="/teachers" activeStyle>
                    Teachers
                </NavLink>
                <NavLink to="/students" activeStyle>
                    Students
                </NavLink>
                <NavLink to="/display-posts" activeStyle>
                    All Posts
                </NavLink> 
                <NavLink to="/show-saved-posts" activeStyle>
                    Saved
                </NavLink>
                {/* <Link to="/" className="btn btn-outline-success ml-4" onClick={
                    axios.get("/session_logout_api")
                }>Log Out</Link> */}
                <Link to="/log-out" className="btn btn-outline-success ml-4" activeStyle>
                Log Out
                </Link> 
              
                         
            </NavMenu>
        </Nav>
        </>
);
};



