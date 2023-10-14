import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Post } from './Post';
import './style.css'

export const GetPost = (props) => {

    useEffect(() => {

        getPost();
        getLikedPosts();
        getDislikedPosts()
        countLikedPost();
        countDislikedPost();
        countFollowers();
        countFollowings();
        getName();
        getProfilePath();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [allPost, setAllPost] = useState([])
    const [likedPostIds, setLikedPostIds] = useState([]);
    const [disLikedPostIds, setDislikedsPostIds] = useState([]);
    const [lpId, setLpId] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [dlpId, setDlpId] = useState([]);
    const [path, setPath] = useState(null);
    const name = useRef(null);



    const getPost = async () => {
        try {
            const host = "http://localhost:5500";
            const res = await axios.get(`${host}/api/post/getPost`, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                }
            });
            // console.log(res);
            setAllPost(res.data.data);

            if (!res.data.data || res.data.data.length === 0) {
                props.showAlert("No Post to Show", 'primary');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getProfilePath = async () => {
        const host = "http://localhost:5500";
        const token = localStorage.getItem('token');
        try {
          const result = await axios.get(
            `${host}/api/auth/getUser`, {
              headers: {
                'auth-token': token
              }
            }
          )
          if (result.data.status) {
            setPath(result.data.user.image);
          } else {
            props.showAlert('Some error occurred while getting profile', 'danger');
          }
        } catch (err) {
          console.log(err);
          props.showAlert(err.response.data.error, "danger");
        }
        
      }
    const deletePost = async (post) => {
        const postId = post._id;
        try {
            const host = "http://localhost:5500";
            const res = await axios.post(`${host}/api/post/deletePost`, { postId }, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                }
            });
            // console.log(res.data.posts);
            setAllPost(res.data.posts);

            if (res.data.posts.length === 0) {
                props.showAlert("No Post to Show", 'primary');
            }
        } catch (error) {
            console.error(error);
        }
    }

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


    const countFollowers = async () => {
        try {
            const host = 'http://localhost:5500';
            const res = await axios.post(`${host}/api/folk/countFollowers`, null, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                },
            });

            if (res.data.status) {
                // console.log('countFollowers', res.data.count);
                setFollowers(res.data.count);
                
            } else {
                // console.log('remove failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const countFollowings = async () => {
        try {
            const host = 'http://localhost:5500';
            const res = await axios.post(`${host}/api/folk/countFollowings`, null, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                },
            });

            if (res.data.status) {
                // console.log('countFollowings', res.data.count);
                setFollowings(res.data.count);
                
            } else {
                // console.log('remove failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getName = async () => {
        try {
            const host = 'http://localhost:5500';
            const res = await axios.get(`${host}/api/auth/getName`, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                },
            });

            if (res.data.status) {
                // console.log('name:', res.data.name);
                name.current = res.data.name;
                // console.log("name", name.current);
            } else {
                // console.log('remove failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            
            <div className="container mt-4">
                <Post lpId={lpId} allPost={allPost} remove={remove} dlpId={dlpId} likedPostIds={likedPostIds}
                 disLikedPostIds={disLikedPostIds} makeDislikePost={makeDislikePost} makeLikePost={makeLikePost}
                 followers={followers} followings={followings} deletePost={deletePost} name={name} path={path}/>
            </div>
        </div>
    );
};

// install:    npm install --save @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
