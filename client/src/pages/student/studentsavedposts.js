import React, {useState, useEffect} from 'react'
import axios from 'axios';
    
export default function DisplaySavedPosts() {

    const [saved, setSaved] = useState({})
    const [load,setLoad] = useState(false)

    useEffect(() => { 
        axios.get("/show_saved_posts_api").then((response) => {
            setSaved(response.data.result)
            setLoad(true)
        })
    }, [] );

      return !load ? <p>Loading...</p> : (
        <>
                { Array.from(saved).map(
                    bruh => <div>
                        <div className="card border-dark mb-3 mt-5">
                <div className="card-header">{bruh[2]} <div className="small">{bruh[3].slice(4,17)}</div></div>
                <div className="card-body text-dark">
                    <h3 className="card-title">{bruh[0]}</h3>
                    <p className="card-text pt-4">{bruh[1]}</p>
                </div>
                </div>
                    </div>
                )}
        </>
    )
}
