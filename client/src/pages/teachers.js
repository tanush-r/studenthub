import React, {useState, useEffect} from 'react'
import axios from 'axios';
    
function Teachers() {

    const [data, setData] = useState({})

    useEffect(() => {axios.get('/teachers_list_api').then((response) => {
        setData(response.data)
    }
    )
    }
    , [] );

    return (
        <div>
            <p>{JSON.stringify(data)}</p>
        </div>
  )
}

export default Teachers