import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TeacherSignIn() {
    // States for redirect
    const navigate = useNavigate()

    // States for login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMess, setErrorMess] = useState('');

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
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
    const axiosGetCall = () => {
        const returnJSON = {
            "email": email,
            "password": password,
            credentials: 'include'
        }
        axios.post("/sign_in_teacher", returnJSON).then(response => {
            if(response.data.exists !== "yes") {
                setSubmitted(false);
                setError(true);
                setErrorMess("Login does not exist!")
            } else {
                setSubmitted(true);
                setError(false);
                navigate('/teacher-posts')
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setError(true);
            setErrorMess("Please enter all the fields");
        } else if (!validateEmail(email)) {
            setError(true);
            setErrorMess("Wrong email");
        } else if (password.length < 8) {
            setError(true);
            setErrorMess("Wrong password");
        } else {
            axiosGetCall();
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
            <p className='text-success'>Signed In!</p>
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

    // The page itself
    return (
        <div className="form">
        <div>
            <h1>Teacher Log In</h1>
        </div>
    
        {/* Calling to the methods */}
        <div className="messages">
            {errorMessage()}
            {successMessage()}
        </div>
    
        <form>
            {/* Labels and inputs for form data */}
            
            <label className="label mt-2">Email</label>
            <br></br>
            <input onChange={handleEmail} className="input"
            value={email} type="email" />
      
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
};
