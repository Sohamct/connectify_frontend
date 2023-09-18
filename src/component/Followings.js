import React from 'react'

export const Followings= (props) => {
    const data = props.data;
    const unFollow = props.unFollow;
    return (
        <ul>
        
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <p  style={{ margin: 0 }}>{data.userName}</p>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={() => unFollow(data)}>unFollow</button>
                    </div>
                </li>
                
        </ul>
    )
}
