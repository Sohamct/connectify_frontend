import React from 'react'

export const Followings= (props) => {
    const data = props.data;
    const unFollow = props.unFollow;
    return (
        <ul>
        
                <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="profile-details d-flex align-items-center">
                                <div className="profile-picture mr-2">
                                    {!data.image ? <img style={{ height: '50px', width: '50px' }} src={require(`./images/profile.jpg`)} className="card-img-top" alt={""} /> :
                                        <img style={{ height: '60px', width: '60px' }} className="custom-card-img" src={require(`./images//${data.image}`)} alt={""} />
                                    }
                                </div>
                                <p style={{ margin: 0 }}>{data.userName}</p>
                            </div>
                    <div>
                        <button className="btn btn-warning" onClick={() => unFollow(data)}>UnFollow</button>
                    </div>
                </li>
                
        </ul>
    )
}
