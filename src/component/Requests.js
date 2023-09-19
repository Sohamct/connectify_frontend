import React from 'react'

export const Requests = (props) => {
    const data = props.data;
    const acceptRequest = props.acceptRequest;
    const denieRequest = props.denieRequest;
    return (
        <ul>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <p style={{ margin: 0 }}>{data.userName}</p>
                    </div>
                    <div>
                        <button className="btn btn-success mx-2" onClick={() => acceptRequest(data)}>Accept</button>
                        <button className="btn btn-danger" onClick={() => denieRequest(data)}>Reject</button>
                    </div>
        
                </li>
        </ul>
    )
}
