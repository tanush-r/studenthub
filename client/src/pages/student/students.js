import React, {useState, useEffect} from 'react'
import axios from 'axios';
    
function Students() {

    const [data, setData] = useState({})
    const [load,setLoad] = useState(false)

    useEffect(() => { 
        axios.get('/students_list_api').then((response) => {
            setData(response.data)
            setLoad(true)
        }
    )}, [] );


    return !load ? <p>loading...</p> : (
        <div>
            {/* <div>
                {JSON.stringify(data)}
                {Object.entries(data).map( ([key, value]) => 
                <div>
                    <h1>{key}</h1>
                    {Array.from(value).map(
                        bruh => <div className="row">
                            <div className='col'>{bruh[1]}</div>
                            <div className='col'>{bruh[2]}</div>
                            <div className='col'>{bruh[3]}</div>
                            </div>
                    )}
                </div> 
                )}
            </div> */}
            
            <h1>Class List</h1>
            {  
                Object.entries(data).map(
                        ([classSec,teachers]) => 
                            <>
                                <h2 className='pt-4'>{classSec}</h2>
                                <table className="table table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                        <th scope="col">Email</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Phone No</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {Array.from(teachers).map(
                                        (teacher) => 
                                            <tr>
                                                <td>{teacher[1]}</td>
                                                <td>{teacher[2]}</td>
                                                <td>{teacher[3]}</td>
                                            </tr> 
                                        
                                    )}
                                    </tbody>
                                </table>
                            </> 
                        
                    )
                }
                {
                   
                }
           
        </div>

  )
}

export default Students