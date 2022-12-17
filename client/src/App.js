import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages';
import About from './pages/about';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Teachers from './pages/teachers'
import TeacherSignIn from './pages/teachersignin'
import TeacherPosts from './pages/teacherposts';
import UserProfile from './pages/session/userprofile';
import TeacherNavbar from './components/Navbar/teacherindex';

function App() {
	const [data, setData] = useState("");
	const [location, setLocation] = useState("");
	useEffect(() => {
			setData(UserProfile.getName('type'));
			if ( data === null ) setData("");
	      	}, [location]);
	const SettingLocation = () => {
		setLocation(useLocation())
	}
	return (
		<Router>
		<SettingLocation />
		{data === 'teacher' ?
		<TeacherNavbar /> : <Navbar />}
		<div class="container pt-4">
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About/>} />
				<Route path='/sign-in' element={<SignIn/>} />
				<Route path='/teacher-sign-in' element={<TeacherSignIn/>} />
				<Route path='/teachers' element={<Teachers/>} />
				<Route path='/sign-up' element={<SignUp/>} />
				<Route path='/teacher-posts' element={
					data === 'teacher' ? <TeacherPosts/> : <p className='text-danger'>Invalid link {data}</p>
				} />
			</Routes>
		</div>
		</Router>
);
}

export default App;
