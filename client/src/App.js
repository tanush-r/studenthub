import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages';
import About from './pages/about';
import SignIn from './pages/signin';
import TeacherSignUp from './pages/teacher/teachersignup';
import Teachers from './pages/teacher/teachers'
import TeacherSignIn from './pages/teacher/teachersignin'
import TeacherPosts from './pages/teacher/teacherposts';
import TeacherNavbar from './components/Navbar/teacherindex';
import DisplayPosts from './pages/displayposts'
import StudentSignUp from './pages/student/studentsignup';
import StudentSignIn from './pages/student/studentsignin';
import axios from 'axios';
import LogOut from './logout';
import Students from './pages/student/students';
import StudentNavbar from './components/Navbar/studentindex';
import DisplaySavedPosts from './pages/student/studentsavedposts';
import ViewPdf from './pages/viewpdf';

function App() {
	const [profile, setProfile] = useState("")
	const [location, setLocation] = useState("");
	// const [loading,setLoading] = useState(false)
	useEffect(
		() => {axios.get("/session_details_api").then(
			response => {
				setProfile(response.data.type)
			})
		}, [location] )
	const SettingLocation = () => {
		setLocation(useLocation())
	}
	return (
		<Router>
		<SettingLocation />
		{profile === 'teacher' ?
		<TeacherNavbar /> : 
		profile === 'student' ? 
		<StudentNavbar /> : <Navbar />
		}
		<div class="container pt-4">
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About/>} />
				<Route path='/sign-in' element={<SignIn/>} />
				<Route path='/teacher-sign-in' element={<TeacherSignIn/>} />
				<Route path='/teachers' element={<Teachers/>} />
				<Route path='/teacher-sign-up' element={<TeacherSignUp/>} />
				<Route path='/teacher-posts' element={<TeacherPosts/>} />
				<Route path='/display-posts' element={< DisplayPosts />} />
				<Route path='/students' element={<Students/>} />
				<Route path='/student-sign-in' element={<StudentSignIn/>} />
				<Route path='/student-sign-up' element={<StudentSignUp/>} />
				<Route path='/log-out' element={<LogOut/>} />
				<Route path='/show-saved-posts' element={<DisplaySavedPosts />} />
				<Route path='/view-pdf/:id' element={<ViewPdf />} />
			</Routes>
		</div>
		</Router>
);
}

export default App;
