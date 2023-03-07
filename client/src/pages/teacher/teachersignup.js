import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TeacherSignUp() {

	const navigate = useNavigate()

// States for registration
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [class5A, setClass5A] = useState(false);
const [class5B, setClass5B] = useState(false);
const [class5C, setClass5C] = useState(false);
const [class5D, setClass5D] = useState(false);
const [password, setPassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);
const [errorMess, setErrorMess] = useState('');

// Handling the name change
const handleName = (e) => {
	setName(e.target.value);
	setSubmitted(false);
};

// Handling the email change
const handleEmail = (e) => {
	setEmail(e.target.value);
	setSubmitted(false);
};

// Handling the email change
const handlePhone = (e) => {
	setPhone(e.target.value);
	setSubmitted(false);
};

// Handling each class change
const handle5A = (e) => {
	setClass5A(!class5A);
	setSubmitted(false);
};

const handle5B = (e) => {
	setClass5B(!class5B);
	setSubmitted(false);
};

const handle5C = (e) => {
	setClass5C(!class5C);
	setSubmitted(false);
};

const handle5D = (e) => {
	setClass5D(!class5D);
	setSubmitted(false);
};

// Handling the password change
const handlePassword = (e) => {
	setPassword(e.target.value);
	setSubmitted(false);
};

// Email regex check
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

// Phone no check
const validatePhone = (phone) => {
    return String(phone)
      .toLowerCase()
      .match(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
      );
  };

const axiosPostCall = () => {
    var classSet = "";
    if(class5A) classSet = "5A";
    else if(class5B) classSet = "5B";
    else if(class5C) classSet = "5C";
    else classSet = "5D";
    const returnJSON = {
        "name": name,
        "email": email,
        "phone": phone,
        "password": password,
        "class": classSet
    }
    axios.post('/sign_up_teacher', returnJSON).catch(error => {
        setErrorMess("Account already exists!");
        setError(true);
        setSubmitted(false);
    });
}

// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
	if (name === '' || email === '' || password === '' || phone === '' || (!class5A && !class5B && !class5C && !class5D)) {
        setError(true);
        setErrorMess("Please enter all the fields");
	} else if (!validateEmail(email)) {
        setError(true);
        setErrorMess("Wrong email");
    } else if (!validatePhone(phone)) {
        setError(true);
        setErrorMess("Wrong Phone no");
    } else if (password.length < 8) {
        setError(true);
        setErrorMess("Minimum 8 characters for password");
    } else {
        setSubmitted(true);
        setError(false);
        axiosPostCall();
        navigate("/teacher-sign-in")
	}
};

// Showing success message
const successMessage = () => {
	return (
	<div
		className="success"
		style={{
		display: submitted ? '' : 'none',
		}}>
		<p className='text-success'>User {name} successfully registered!!</p>
	</div>
	);
};

// Showing error message if error is true
const errorMessage = () => {
	return (
	<div
		className="error"
		style={{
		display: error ? '' : 'none',
		}}>
		<p className='text-danger'>{ errorMess }</p>
	</div>
	);
};

return (
	<div className="form">
	<div>
		<h1>Teacher Registration</h1>
	</div>

	{/* Calling to the methods */}
	<div className="messages">
		{errorMessage()}
		{successMessage()}
	</div>

	<form>
		{/* Labels and inputs for form data */}
		<label className="label">Full Name</label>
        <br></br>
		<input onChange={handleName} className="input"
		value={name} type="text" />
        <br></br>
		<label className="label mt-2">Email</label>
        <br></br>
		<input onChange={handleEmail} className="input"
		value={email} type="email" />

        <br></br>
        <label className="label mt-2">Phone No</label>
        <br></br>
		<input onChange={handlePhone} className="input"
		value={phone} type="tel" />
        <br></br>

        <label className="label mt-2">Class</label>
        <br></br>
        <input onChange={handle5A} type="radio" id="5A" name="class_select" value="5A"/>
        <label for="5A">5A</label><br/>
        <input onChange={handle5B} type="radio" id="5B" name="class_select" value="5B"/>
        <label for="5B">5B</label><br/>
        <input onChange={handle5C} type="radio" id="5C" name="class_select" value="5C"/>
        <label for="5C">5C</label><br/>
        <input onChange={handle5D} type="radio" id="5D" name="class_select" value="5D"/>
        <label for="5D">5D</label>

        <br></br>

		<label className="label mt-2">Password</label>
        <br></br>
		<input onChange={handlePassword} className="input"
		value={password} type="password" />

        <br></br>
		<button onClick={handleSubmit} className="btn btn-outline-success mt-4" type="submit">
		Submit
		</button>
	</form>
	</div>
);
}
