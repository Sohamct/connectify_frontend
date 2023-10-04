import React from 'react';

export const Followers = (props) => {
    const followerRequested = props.followerRequested;
    const followersFollowings = props.followersFollowings;
    const removeFollower = props.removeFollower;
    const followback = props.followback;
    const makeFollowback = props.makeFollowback;

    return (
        <ul>
            {followerRequested.length !== 0 || followersFollowings.length !== 0 || followback.length !== 0 ? (
                <div>
                    {followerRequested && followerRequested.map((data, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div className="profile-details d-flex align-items-center">
                                <div className="profile-picture mr-2">
                                    {!data.image ? <img style={{ height: '50px', width: '50px' }} src={require(`./images/profile.jpg`)} className="card-img-top" alt={""} /> :
                                        <img style={{ height: '60px', width: '60px' }} className="custom-card-img" src={require(`./images//${data.image}`)} alt={""} />
                                    }
                                </div>
                                <p style={{ margin: 0 }}>{data.userName}</p>
                            </div>
                            <div>
                                <button className="btn btn-danger mx-2" onClick={() => removeFollower(data)}>Remove</button>
                                <button className="btn btn-primary disabled">Requested</button>
                            </div>
                        </li>
                    ))}
                    {followback && followback.map((data, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="profile-details d-flex align-items-center">
                                <div className="profile-picture mr-2">
                                    {!data.image ? <img style={{ height: '50px', width: '50px' }} src={require(`./images/profile.jpg`)} className="card-img-top" alt={""} /> :
                                        <img style={{ height: '60px', width: '60px' }} className="custom-card-img" src={require(`./images//${data.image}`)} alt={""} />
                                    }
                                </div>
                                <p style={{ margin: 0 }}>{data.userName}</p>
                            </div>
                            <div>
                                <button className="btn btn-danger mx-2" onClick={() => removeFollower(data)}>Remove</button>
                                <button className="btn btn-info" onClick={() => makeFollowback(data)}>FollowBack</button>
                            </div>
                        </li>
                    ))}
                    {followersFollowings && followersFollowings.map((data, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="profile-details d-flex align-items-center">
                                <div className="profile-picture mr-2">
                                    {!data.image ? <img style={{ height: '50px', width: '50px' }} src={require(`./images/profile.jpg`)} className="card-img-top" alt={""} /> :
                                        <img style={{ height: '60px', width: '60px' }} className="custom-card-img" src={require(`./images//${data.image}`)} alt={""} />
                                    }
                                </div>
                                <p style={{ margin: 0 }}>{data.userName}</p>
                            </div>
                            <div>
                                <button className="btn btn-danger mx-2" onClick={() => removeFollower(data)}>remove</button>

                            </div>
                        </li>
                    ))}
                </div>
            ) : (
                <p>No followers</p>
            )}
        </ul>
    );
};
