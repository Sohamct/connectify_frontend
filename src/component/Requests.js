import React from 'react'

export const Requests = (props) => {
    const data = props.data;
    const acceptRequest = props.acceptRequest;
    return (
        <ul>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <p style={{ margin: 0 }}>{data.userName}</p>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={() => acceptRequest(data)}>Accept</button>
                    </div>
                </li>
        </ul>
    )
}
