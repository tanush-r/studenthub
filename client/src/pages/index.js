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
                        <Link to="/sign-up" className="btn btn-outline-primary mt-4 pl-4 pr-4"><FontAwesomeIcon icon={faChalkboardTeacher} />                    For Teachers</Link> <br/>
                        <Link to="/sign-up" className="btn btn-outline-success mt-4 pl-4 pr-4"><FontAwesomeIcon icon={faUserGraduate} />                         For Students</Link>
                    </div>
                </div>

                <div className="col">
                    <div className="container">
                        <h2>Be more productive in college</h2>
                        <p>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis bibendum nulla, in tempus augue tincidunt eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus eros purus, vestibulum in rhoncus hendrerit, feugiat ut lacus. Morbi vestibulum dui id tincidunt rutrum. Aenean tempus ac lacus pretium pretium. Suspendisse eu urna in diam posuere dapibus. Maecenas non sagittis est. Vivamus leo sapien, consectetur nec accumsan eu, blandit in justo. Praesent sagittis, mauris et efficitur elementum, ligula ante feugiat velit, in accumsan ex nisi ac metus. Sed pellentesque egestas vulputate. Nam aliquam pellentesque leo, et sagittis tortor aliquet vel. Suspendisse volutpat in arcu sit amet sagittis. Praesent in rutrum risus. Fusce dapibus risus nec orci ullamcorper t.
                        </p>
                    </div>
            </div> 
		</div>
	</>
);
};

export default Home;
