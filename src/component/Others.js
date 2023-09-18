import React, { useState } from 'react'

export const Others = (props) => {
    // const [data, setData] = useState(props.others);
    const data = props.data;
    const makeRequest = props.makeRequest;
    return (
        <ul>
        
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <p   style={{ margin: 0 }}>{data.userName}</p>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={() => makeRequest(data)}>Follow</button>
                    </div>
                </li>
                
        </ul>
    )
}
