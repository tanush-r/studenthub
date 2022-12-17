import React from "react";
import UserProfile from "../../pages/session/userprofile";
import { Nav, NavLink, NavMenu, NavHead }
	from "./NavbarElements";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const logOut = () => {
        UserProfile.clearProfile();
        navigate('/');
    }

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
                    <NavLink to="/sign-in" activeStyle>
                        Sign In
                    </NavLink> 
                 
            
           
            </NavMenu>
        </Nav>
        </>
);
};



