import React from 'react'

export const Followback = (props) => {
    const data = props.data;
    const makeFollowback = props.makeFollowback;
    return (
        <ul>
        
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <p style={{ margin: 0 }}>{data.userName}</p>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={() => makeFollowback(data)}>Followback</button>
                    </div>
                </li>
                
        </ul>
    )
}
