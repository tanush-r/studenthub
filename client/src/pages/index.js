import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboardTeacher, faUserGraduate } from '@fortawesome/free-solid-svg-icons'
 
const Home = () => {
return (
	<>
        <div className="row d-flex align-items-center">
            <div className="col vertical-center">
                <div className="text-center ml-5">
                    <h1>Sign Up Now</h1>
                        <Link to="/teacher-sign-up" className="btn btn-outline-primary mt-4 pl-4 pr-4"><FontAwesomeIcon icon={faChalkboardTeacher} />                    For Teachers</Link> <br/>
                        <Link to="/student-sign-up" className="btn btn-outline-success mt-4 pl-4 pr-4"><FontAwesomeIcon icon={faUserGraduate} />                         For Students</Link>
                    </div>
                </div>

                <div className="col">
                    <div className="container">
                        <h2>Create Posts, Manage Students</h2>
                        <p>
                            Studenthub is the place for all your needs, teacher or student. Support for four sections in the class. Your post can contain 10000 characters. Now that is a lot of 
                            characters. You can save as many posts you want for your future reference. This amazing website is powered by both Python and 
                            JavaScript. Create your account now! 
                        </p>
                    </div>
            </div> 
		</div>
	</>
);
};

export default Home;
