
import React, { useState } from 'react'
import axios from 'axios';
import './style.css'

export const Post = (props) => {

    const [LikedUsers, setLikedUsers] = useState([]);

    const allPost = props.allPost;
    const likedPostIds = props.likedPostIds;
    const remove = props.remove;
    const makeLikePost = props.makeLikePost;
    const makeDislikePost = props.makeDislikePost;
    const lpId = props.lpId;
    const disLikedPostIds = props.disLikedPostIds;
    const dlpId = props.dlpId;
    const deletePost = props.deletePost;
    const followers = props.followers;
    const followings = props.followings;
    const name = props.name.current;
    const path = props.path;

    const getLikedUsers = async (post) => {
        try {
            const postId = post._id;
            const host = 'http://localhost:5500';
            const res = await axios.post(`${host}/api/post/getLikedUsers`, { postId }, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                    'postId': postId
                },
            });

            if (res.data.status) {
                setLikedUsers(res.data.likedPostUsers);
            } else {
                console.log('getLikedUsers failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="profile-header">
                <div className="profile-details d-flex align-items-center">
                    <div className="profile-picture mr-2">
                        {!path ? <img style={{ height: '100px', width: '100px' }} src={require(`./images/profile.jpg`)} className="card-img-top" alt={""} /> :
                            <img style={{ height: '160px', width: '160px' }} className="custom-card-img" src={require(`./images//${path}`)} alt={""} />
                        }
                    </div>
                    <h2 style={{ margin: 0 }}>{name}</h2>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 border rounded p-3">
                            <h2>Total Posts</h2>
                            <h2 className="count">{allPost.length}</h2>
                        </div>
                        <div className="col-md-4 border rounded p-3">
                            <h2>Followers</h2>
                            <h2 className="count">{followers || 0}</h2>
                        </div>
                        <div className="col-md-4 border rounded p-3">
                            <h2>Following</h2>
                            <h2 className="count">{followings || 0}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="my-4">Your Posts</h1>
            {allPost && (
                <div className="container my-4 border rounded p-3">
                    <div className="row">

                        {allPost.map((post, index) => (
                            <div key={post._id} className="col-md-4 mb-4">
                                <div className="card">
                                    <img src={require(`./images//${post.image}`)} className="card-img-top" alt={""} />
                                    <div className="card-body">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">{post.description}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <button
                                                    className={`btn btn-outline-primary ${likedPostIds.includes(post._id) ? 'active' : ''}`}
                                                    onClick={() => likedPostIds.includes(post._id) ? remove(post) : makeLikePost(post)}
                                                >
                                                    <img
                                                        src={require('./Like_Image/like_t.png')}
                                                        height={25}
                                                        width={25}
                                                        alt={'like_t'}
                                                    /> {lpId[post._id] || 0}
                                                </button>
                                                <button
                                                    className={`btn btn-outline-danger ${disLikedPostIds.includes(post._id) ? 'active' : ''}`}
                                                    onClick={() => disLikedPostIds.includes(post._id) ? remove(post) : makeDislikePost(post)}
                                                >
                                                    <img
                                                        src={require('./Like_Image/dislike_t.png')}
                                                        height={25}
                                                        width={25}
                                                        alt={'dislike_t'}
                                                    /> {dlpId[post._id] || 0}
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm mx-1"
                                                    data-toggle="modal"
                                                    data-target={`#exampleModal-${post._id}`}
                                                >
                                                    Deletepost
                                                </button>
                                                <div className="modal fade" id={`exampleModal-${post._id}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModalLabel-${post._id}`} aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id={`exampleModalLabel-${post._id}`}>Delete Post</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                Are you sure you want to delete this post?
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => deletePost(post)}>Yes</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Likeuseres */}
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn btn-info btn-sm"
                                                    data-toggle="modal"
                                                    data-target={`#exampleModal-${index}`}
                                                    onClick={() => getLikedUsers(post)}
                                                >
                                                    Likedby
                                                </button>
                                                <div className="modal fade" id={`exampleModal-${index}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModalLabel-${post._id}`} aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id={`exampleModalLabel-${index}`}>Liked By users</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                {likedPostIds ? LikedUsers.map((liker, index) => (

                                                                    <div className="profile-details d-flex align-items-center">
                                                                        <div className="profile-picture mr-2">
                                                                            {!liker.image ? <img style={{ height: '50px', width: '50px' }} src={require(`./images/profile.jpg`)} className="card-img-top" alt={""} /> :
                                                                                <img style={{ height: '50px', width: '50px' }} className="custom-card-img" src={require(`./images//${liker.image}`)} alt={""} />
                                                                            }
                                                                        </div>
                                                                        <p className="username" key={index}>{liker.userName}</p>
                                                                    </div>
                                                                )) : <p>No one has liked this post</p>}
                                                            </div>
                                                            <div className="modal-footer">

                                                                <button type="button" className="btn btn-primary" data-dismiss="modal">ok</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
