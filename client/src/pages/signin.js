import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboardTeacher, faUserGraduate } from '@fortawesome/free-solid-svg-icons'

const SignIn = () => {
return (
	<>
        <div className="row d-flex align-items-center">
            <div className="col vertical-center">
                <div className="text-center ml-5">
                    <h1>Login Now</h1>
                        <Link to="/teacher-sign-in" className="btn btn-outline-primary mt-4 pl-4 pr-4"><FontAwesomeIcon icon={faChalkboardTeacher} />                    For Teachers</Link> <br/>
                        <Link to="/student-sign-in" className="btn btn-outline-success mt-4 pl-4 pr-4"><FontAwesomeIcon icon={faUserGraduate} />                     For Students</Link>
                        <p className='mt-5'>Haven't created a profile yet? <Link to="/sign-up" className=''>Sign up now</Link></p>
                    </div>
                </div>

                <div className="col">
                    <div className="container">
                        <h2>Unlimited posts!</h2>
                        <p>
                            By using MySQL DBMS powered systems we can store as many posts as we like.
                        </p>
                        <h2 className='mt-2'>Powered By</h2>
                        <div className='row mt-4'>
                            <div className='col'>
                                <img src="https://assets.stickpng.com/images/5848152fcef1014c0b5e4967.png" className="img-rounded" /> 
                            </div>
                            <div className='col'>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" className="img-rounded" /> 
                            </div>
                            <div className='col'>
                                <img src="https://www.freepnglogos.com/uploads/logo-mysql-png/logo-mysql-mysql-logo-png-images-are-download-crazypng-21.png" className="img-rounded" /> 
                            </div>
                        </div>
                    </div>
            </div> 
		</div>
		
	</>
);
};

export default SignIn;
