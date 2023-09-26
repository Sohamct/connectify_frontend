import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { useGlobalContext } from './GlobalState';
import { Search } from './Search';

export const AllPost = () => {
    const [allPost, setAllPost] = useState([]);
    const [likedPostIds, setLikedPostIds] = useState([]);
    const [disLikedPostIds, setDislikedsPostIds] = useState([]);
    const [lpId, setLpId] = useState([]);
    const [dlpId, setDlpId] = useState([]);
    const [postToUserName, setPostToUserName] = useState([]);
    const [filteredPost, setFilteredPost] = useState([]);
    const { searchQuery, updateSearchQuery } = useGlobalContext();

    const fetchAllPost= async () =>  {
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
    const fetchOwner = async () => {
        try {
            const host = 'http://localhost:5500';
            const resp = await axios.get(`${host}/api/post/fetchOwner`, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                },
            });

            if (resp.data.status) {
                setPostToUserName(resp.data.map);
            } else {
                console.log("some error");
            }
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
    const handleSearch = (query) => {
        
        updateSearchQuery(query);
    };
    useEffect(() => {
        
        function fetchData() {
             fetchAllPost();
             getLikedPosts();
             getDislikedPosts();
             countLikedPost();
             countDislikedPost();
             fetchOwner();
            // console.log(se)
            
            const filteredPosts = allPost.filter((post) =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
    
            // Update the filteredPost state with the filtered result
            setFilteredPost(filteredPosts);
        }
    
        // Call the fetchData function when the component mounts
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    function formatDate(date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            date = new Date(date);
        }
        const amOrPm = date.getHours() >= 12 ? "PM" : "AM";
        const hours = (date.getHours() % 12).toString().padStart(2, '0') || '12';
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year} ${hours}:${minutes} ${amOrPm}`;
    }

    
    return (
        <div className="container">
            <h1 className="my-4">All Posts</h1>
            <div className="row border rounded p-3">
            <Search onSearch={handleSearch}></Search>
            <br></br>
                {filteredPost && filteredPost.map((post, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                            <img
                                src={require(`./images/${post.image}`)}
                                className="card-img-top"
                                alt={post.title}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.description}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <div className="post-info">
                                    <p className="mb-0">Posted by: {postToUserName[post._id]}</p>
                                    <p className="mb-0">Posted on: {formatDate(post.date)}</p>
                                </div>
                                <div className="post-actions">
                                    <div className="d-flex align-items-center">
                                        <button
                                            className={`btn btn-outline-primary ${likedPostIds.includes(post._id) ? 'active' : ''}`}
                                            onClick={() => likedPostIds.includes(post._id) ? remove(post) : makeLikePost(post)}
                                        >
                                            <FontAwesomeIcon icon={faThumbsUp} /> {lpId[post._id] || 0}
                                        </button>
                                        <button
                                            className={`btn btn-outline-danger ${disLikedPostIds.includes(post._id) ? 'active' : ''}`}
                                            onClick={() => disLikedPostIds.includes(post._id) ? remove(post) : makeDislikePost(post)}
                                        >
                                            <FontAwesomeIcon icon={faThumbsDown} /> {dlpId[post._id] || 0}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

 // install:    npm install --save @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons

    // return (
    //     <div className="container">
    //         <h1 className="my-4">All Post</h1>
    //         <div className="container mt-4">
    //             {allPost && (
    //                 <div className="row">

    //                     {allPost && (
    //                         <div className="row">
    //                             {allPost.map((post, index) => (
    //                                 <div key={index} className="col-md-3 mb-4">
    //                                     <div className="card">
    //                                         <img
    //                                             src={require(`./images/${post.image}`)}
    //                                             className="card-img-top"
    //                                             alt={''}
    //                                         />
    //                                         <div className="card-body">
    //                                             <h5 className="card-title">{post.title}</h5>
    //                                             <p className="card-text">{post.description}</p>
    //                                             <div className="d-flex justify-content-between">
    //                                             <div>
    //                                                 {Array.isArray(likedPostIds) && likedPostIds.includes(post._id) ? (
    //                                                     <img
    //                                                         src={require('./Like_Image/like_t.png')}
    //                                                         height={25}
    //                                                         width={25}
    //                                                         onClick={() => remove(post)}
    //                                                         alt={'like_t'}
    //                                                     />
    //                                                 ) : (
    //                                                     <img
    //                                                         src={require('./Like_Image/like_f.png')}
    //                                                         height={25}
    //                                                         width={25}
    //                                                         onClick={() => makeLikePost(post)}
    //                                                         alt={'like_f'}
    //                                                     />
    //                                                 )}
    //                                                 {lpId[post._id] ? <span className="ml-2">{lpId[post._id]}</span> :
    //                                                  <span className="ml-2">0</span>}
    //                                                 </div>
    //                                                 <div>
    //                                                 {Array.isArray(disLikedPostIds) && disLikedPostIds.includes(post._id) ? (
    //                                                     <img
    //                                                         src={require('./Like_Image/dislike_t.png')}
    //                                                         height={25}
    //                                                         width={25}
    //                                                         onClick={() => remove(post)}
    //                                                         alt={'dislike_t'}
    //                                                     />
    //                                                 ) : (
    //                                                     <img
    //                                                         src={require('./Like_Image/dislike_f.png')}
    //                                                         height={25}
    //                                                         width={25}
    //                                                         onClick={() => makeDislikePost(post)}
    //                                                         alt={'dislike_f'}
    //                                                     />
    //                                                 )}
    //                                                 {dlpId[post._id] ? <span className="ml-2">{dlpId[post._id]}</span> :
    //                                                  <span className="ml-2">0</span>}
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             ))}
    //                         </div>
    //                     )}

    //                 </div>
    //             )}
    //         </div>
    //     </div>
    // );
}
