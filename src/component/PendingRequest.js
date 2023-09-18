import React from 'react'

export const PendingRequest = (props) => {
    const data = props.data;
    const cancelRequest = props.cancelRequest;
    return (
        <ul>
        
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <p style={{ margin: 0 }}>{data.userName}</p>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={() => {cancelRequest(data)}}>Cancel</button>
                    </div>
                </li>
                
        </ul>
    )
}
