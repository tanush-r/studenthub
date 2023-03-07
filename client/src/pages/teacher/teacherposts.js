import React, { useRef } from 'react'
import { useState,useEffect } from 'react';
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfile from '../session/userprofile';

export default function TeacherPosts() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [temail, setTemail] = useState("")
    useEffect(() => {axios.get("/session_details_api").then(
        (response) => {
            if (response.data.logged) {
                setLoggedIn(true)
                setTemail(response.data.details.email)
            }
        }
    )},[])

     // States for redirect
     const navigate = useNavigate()

     // States for login
     const [title, setTitle] = useState('');
     const [content, setContent] = useState('');
     const [file, setFile] = useState(null);

     // States for checking the errors
     const [submitted, setSubmitted] = useState(false);
     const [error, setError] = useState(false);
     const [errorMess, setErrorMess] = useState('');

      // Handling the email change
    const handleTitle = (e) => {
        setTitle(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handleContent = (e) => {
        setContent(e.target.value);
        setSubmitted(false);
    };

    // Handling file
    const handleFile = (e) => {
        setFile(e.target.files[0]);
        setSubmitted(false);
    };

    const axiosGetCall = () => {
        const returnJSON = {
            "title": title,
            "content": content
        }
        axios.post('/create_post_api', returnJSON).then(
            response => {
                setSubmitted(true)
                if(file !== "") {
                    let formData = new FormData();
                    formData.append("file", file);
                    axios.post('/upload_pdf_api', 
                        formData, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        }
                      })
                      .then(function (response) {
                        console.log(response.data);
                      });
                    }
            }
        ).catch(
            error => {
                setErrorMess("Post title already used");
                setError(true);
                setSubmitted(false); 
            }
        )
       
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '' || content === '') {
            setError(true);
            setErrorMess("Please enter all the fields");
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
            <p className='text-success'>Post created!</p>
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
 
        return !loggedIn ? <p className='text-danger'>Illegal access</p> : (
            <div className="form">
            <div>
                <h1>Posts</h1>
            </div>
        
            {/* Calling to the methods */}
            <div className="messages">
                {successMessage()}
                {errorMessage()}
            </div>
        
            <form method="POST" enctype="multipart/form-data">
                <div className='form-group'>
                    <label className="label mt-2">Title</label>
                    <br></br>
                    <input onChange={handleTitle} className="input form-control col-6"
                    value={title} type="text" />
                </div>
                <br></br>

                <div className='form-group'>
                    <label className="label mt-2">Content</label>
                    <br></br>
                    <textarea onChange={handleContent} className="input form-control col-6"
                    value={content} rows ="4"/>
                </div>
                <br></br>

                <div className='form-group'>
                <label for="exampleFormControlFile1">Upload notes as pdf</label>
                <div>
                    <input type="file" onChange={handleFile} name="file" className="form-control-file" accept="application/pdf"/>
                </div>
                </div>

                <button onClick={handleSubmit} className="btn btn-outline-success mt-4" type="submit">
                Submit
                </button>
            </form>
            </div>
        );
        }