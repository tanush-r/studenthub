import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
background: #191654;
color: #43C6AC;
height: 85px;
display: flex;
justify-content: space-between;

padding: 0.2rem calc((100vw - 1000px) / 2);
z-index: 12;
`;

export const NavHead = styled(Link)`
color: #43C6AC;
display: flex;
align-items: center;
text-decoration: none;
font-family: Arvo;
padding: 0 3rem;
height: 100%;
font-weight: 1000;
font-size: 35px;
&:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`
export const NavLink = styled(Link)`
color: #f5f5f5;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
font-family: Ubuntu;
cursor: pointer;
&:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export const Bars = styled(FaBars)`
display: none;
color: #808080;
@media screen and (max-width: 768px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1.8rem;
	cursor: pointer;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
	display: none;
}
`;
