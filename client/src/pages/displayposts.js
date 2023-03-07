import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
    
export default function DisplayPosts() {

    const [data, setData] = useState({})
    const [saved, setSaved] = useState({})
    const [student, setStudent] = useState(false)
    const [load,setLoad] = useState(false)

    useEffect(() => { 
        axios.get("/show_posts_api").then((response) => {
            setData(response.data.result)
            setStudent(response.data.student)
            setSaved(response.data.saved)
            setLoad(true)
            console.log(data)
        })
    }, [] );

    const savePost = (pid) => {
        const returnJSON = {"pid":pid}
        axios.post("/save_post_api",returnJSON).then((response) => {
            console.log(response)
        } )
        document.getElementById(pid).className = "btn btn-danger disabled"
        document.getElementById(pid).innerHTML = "Post Saved"
    }

       return !load ? <p>Loading...</p> : (
        <>
                { Array.from(data).map(
                    bruh => <div>
                        <div className="card border-dark mb-3 mt-5">
                <div className="card-header">{bruh[2]} <div className="small">{bruh[3].slice(4,17)}</div></div>
                <div className="card-body text-dark">
                    <h3 className="card-title">{bruh[0]}</h3>
                    <p className="card-text pt-4">{bruh[1]}</p>
                </div>
                <div className="card-footer">
                {student ? 
                <div>
                    
                    {saved.includes(bruh[4]) ? 
                    <button id={bruh[4]} className='btn btn-danger disabled'>
                        Post Saved
                    </button>
                    :
                    <button id={bruh[4]} className='btn btn-danger' onClick={() => savePost(bruh[4])}>
                        Save Post
                    </button>
                    }
                    
                   </div> 
                : <></>}
                    <div className='mt-2'>
                    {bruh[5] === "Yes" ? 
                    <Link to={"/view-pdf/"+bruh[4]} className='btn btn-danger'>
                        View PDF
                    </Link> : <></>}
                    </div>
                </div>
                </div>
                    </div>
                )}
        </>
    )
}
