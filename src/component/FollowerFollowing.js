import React from 'react'

export const FollowerFollowing = (props) => {
    const data = props.data;
    const removeFollower = props.removeFollower;
    return (
        <ul>
        
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <p style={{ margin: 0 }}>{data.userName}</p>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={() => removeFollower(data)}>Follow</button>
                    </div>
                </li>
                
        </ul>
    )
}
