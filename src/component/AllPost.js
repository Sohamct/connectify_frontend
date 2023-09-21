import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

export const AllPost = () => {
    const [allPost, setAllPost] = useState([]);
    const [likedPostIds, setLikedPostIds] = useState([]);
    const [disLikedPostIds, setDislikedsPostIds] = useState([]);
    const [lpId, setLpId] = useState([]);
    const [dlpId, setDlpId] = useState([]);

    const fetchAllPost = async () => {
        try {
            const host = 'http://localhost:5500';
            const res = await axios.get(`${host}/api/post/fetchAllPosts`, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                },
            });

            setAllPost(res.data.posts);
        } catch (error) {
            console.error(error);
        }
    };
    const countLikedPost = async () => {
        try {
            const host = 'http://localhost:5500';
            const res = await axios.get(`${host}/api/post/countLikedPost`, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                },
            });
            setLpId(res.data.mp);
            // console.log(res.data.mp);
            
            
        } catch (error) {
            console.error(error);
        }
    };

    const countDislikedPost = async () => {
        try {
            const host = 'http://localhost:5500';
            const res = await axios.get(`${host}/api/post/countDislikedPost`, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                },
            });
            setDlpId(res.data.mp);
            // console.log("disliked post", res.data.mp);
            
        } catch (error) {
            console.error(error);
        }
    };
    const getLikedPosts = async () => {
        try {
            const host = 'http://localhost:5500';
            const res = await axios.get(`${host}/api/post/getLikedPost`, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                },
            });
            // console.log(res.data.LikedPostIds);
            setLikedPostIds(res.data.LikedPostIds);
        } catch (error) {
            console.error(error);
        }
    };
    const getDislikedPosts = async () => {
        try {

            const host = 'http://localhost:5500';
            const res = await axios.get(`${host}/api/post/getDislikedPost`, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                },
            });
            // console.log(res.data.DislikedPostIds);
            setDislikedsPostIds(res.data.DislikedPostIds);
        } catch (error) {
            console.error(error);
        }
    };

    const makeLikePost = async (post) => {
        try {
            const postId = post._id;
            const host = 'http://localhost:5500';
            const res = await axios.post(`${host}/api/post/likePost`, { postId }, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                    'postId': postId
                },
            });

            if (res.data.status) {
                // console.log('liked post')
                getLikedPosts();
                getDislikedPosts()
                countLikedPost();
                countDislikedPost();
            } else {
                console.log('liked post failed')
            }
        } catch (error) {
            console.error(error);
        }
    };


    const makeDislikePost = async (post) => {
        try {
            const postId = post._id;
            const host = 'http://localhost:5500';
            const res = await axios.post(`${host}/api/post/disLikePost`, { postId }, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                    'postId': postId
                },
            });

            if (res.data.status) {
                console.log('Disliked post')
                getLikedPosts();
                getDislikedPosts()
                countLikedPost();
                countDislikedPost();
            } else {
                // console.log('Disliked post failed')
            }
        } catch (error) {
            console.error(error);
        }
    };

    const remove = async (post) => {
        try {
            const postId = post._id;
            const host = 'http://localhost:5500';
            const res = await axios.post(`${host}/api/post/remove`, { postId }, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                    'postId': postId
                },
            });

            if (res.data.status) {
                console.log('remove');
                getLikedPosts();
                getDislikedPosts()
                countLikedPost();
                countDislikedPost();
            } else {
                // console.log('remove failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllPost();
        getLikedPosts();
        getDislikedPosts()
        countLikedPost();
        countDislikedPost();
    }, []);

    return (
        <div className="container">
            <h1 className="my-4">All Post</h1>
            <div className="container mt-4">
                {allPost && (
                    <div className="row">

                        {allPost && (
                            <div className="row">
                                {allPost.map((post, index) => (
                                    <div key={index} className="col-md-3 mb-4">
                                        <div className="card">
                                            <img
                                                src={require(`./images/${post.image}`)}
                                                className="card-img-top"
                                                alt={''}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{post.title}</h5>
                                                <p className="card-text">{post.description}</p>
                                                <div className="d-flex justify-content-between">
                                                <div>
                                                    {Array.isArray(likedPostIds) && likedPostIds.includes(post._id) ? (
                                                        <img
                                                            src={require('./Like_Image/like_t.png')}
                                                            height={25}
                                                            width={25}
                                                            onClick={() => remove(post)}
                                                            alt={'like_t'}
                                                        />
                                                    ) : (
                                                        <img
                                                            src={require('./Like_Image/like_f.png')}
                                                            height={25}
                                                            width={25}
                                                            onClick={() => makeLikePost(post)}
                                                            alt={'like_f'}
                                                        />
                                                    )}
                                                    {lpId[post._id] ? <span className="ml-2">{lpId[post._id]}</span> :
                                                     <span className="ml-2">0</span>}
                                                    </div>
                                                    <div>
                                                    {Array.isArray(disLikedPostIds) && disLikedPostIds.includes(post._id) ? (
                                                        <img
                                                            src={require('./Like_Image/dislike_t.png')}
                                                            height={25}
                                                            width={25}
                                                            onClick={() => remove(post)}
                                                            alt={'dislike_t'}
                                                        />
                                                    ) : (
                                                        <img
                                                            src={require('./Like_Image/dislike_f.png')}
                                                            height={25}
                                                            width={25}
                                                            onClick={() => makeDislikePost(post)}
                                                            alt={'dislike_f'}
                                                        />
                                                    )}
                                                    {dlpId[post._id] ? <span className="ml-2">{dlpId[post._id]}</span> :
                                                     <span className="ml-2">0</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
}
