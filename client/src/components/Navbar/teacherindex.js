import React from "react";
import UserProfile from "../../pages/session/userprofile";
import { Nav, NavLink, NavMenu, NavHead }
	from "./NavbarElements";
import { Link } from "react-router-dom";

export default function TeacherNavbar() {
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
              
                    <NavLink to="/posts" activeStyle>
                        Posts
                    </NavLink> 
                <Link to="/" className="btn btn-outline-success ml-4" onClick={UserProfile.clearProfile()}>Log Out</Link>
                         
            </NavMenu>
        </Nav>
        </>
);
};



