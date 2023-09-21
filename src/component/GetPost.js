import React, { useEffect, useState } from 'react';
import axios from 'axios';


export const GetPost = (props) => {

    const [allPost, setAllPost] = useState([])
    const [likedPostIds, setLikedPostIds] = useState([]);
    const [disLikedPostIds, setDislikedsPostIds] = useState([]);
    const [lpId, setLpId] = useState([]);
    const [dlpId, setDlpId] = useState([]);
    useEffect(() => {
        getPost();
        getLikedPosts();
        getDislikedPosts()
        countLikedPost();
        countDislikedPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getPost = async () => {
        try {
            const host = "http://localhost:5500";
            const res = await axios.get(`${host}/api/post/getPost`, {
                headers: {
                    'auth-token': localStorage.getItem('token'),
                }
            });
            console.log(res);
            setAllPost(res.data.data);

            if (!res.data.data || res.data.data.length === 0) {
                props.showAlert("No Post to Show", 'primary');
            }
        } catch (error) {
            console.error(error);
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
            console.log(res.data.posts);
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

    return (
        <div className="container">
          <h1 className="my-4">Your Posts</h1>
          <div className="container mt-4">
            {allPost && (
              <div className="row">
                {allPost.map((post, index) => (
                  <div key={post._id} className="col-md-4 mb-4">
                    <div className="card">
                      <img src={require(`./images/${post.image}`)} className="card-img-top" alt={""} />
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
                              className="btn btn-danger"
                              data-toggle="modal"
                              data-target={`#exampleModal-${post._id}`}
                            >
                              Delete
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
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
      
    
};

// install:    npm install --save @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons


// return (
//     <div className="container">
//         <h1 className="my-4">Your Post</h1>

//         {/* {allPost && allPost.map((data, index) => {
//             return (<ShowPost description={"Description"} title={"My Title"} key={index} imageUrl={`./images/${data.image}`}/>)
//         }) }  */}
//         <div className="container mt-4">
//             {allPost && (
//                 <div className="row">
//                     {allPost.map((post, index) => (
//                         <div key={post._id} className="col-md-4 mb-4">
//                             <div className="card">
//                                 <img src={require(`./images/${post.image}`)} className="card-img-top" alt={""} />
//                                 <div className="card-body">
//                                     <h5 className="card-title">{post.title}</h5>
//                                     <p className="card-text">{post.description}</p>
//                                     <div className="d-flex justify-content-between">
//                                         <div>
//                                             {Array.isArray(likedPostIds) && likedPostIds.includes(post._id) ? (
//                                                 <img
//                                                     src={require('./Like_Image/like_t.png')}
//                                                     height={25}
//                                                     width={25}
//                                                     onClick={() => remove(post)}
//                                                     alt={'like_t'}
//                                                 />
//                                             ) : (
//                                                 <img
//                                                     src={require('./Like_Image/like_f.png')}
//                                                     height={25}
//                                                     width={25}
//                                                     onClick={() => makeLikePost(post)}
//                                                     alt={'like_f'}
//                                                 />
//                                             )}
//                                             {lpId[post._id] ? <span className="ml-2">{lpId[post._id]}</span> :
//                                                 <span className="ml-2">0</span>}
//                                         </div>
//                                         <div>
//                                             {Array.isArray(disLikedPostIds) && disLikedPostIds.includes(post._id) ? (
//                                                 <img
//                                                     src={require('./Like_Image/dislike_t.png')}
//                                                     height={25}
//                                                     width={25}
//                                                     onClick={() => remove(post)}
//                                                     alt={'dislike_t'}
//                                                 />
//                                             ) : (
//                                                 <img
//                                                     src={require('./Like_Image/dislike_f.png')}
//                                                     height={25}
//                                                     width={25}
//                                                     onClick={() => makeDislikePost(post)}
//                                                     alt={'dislike_f'}
//                                                 />
//                                             )}
//                                             {dlpId[post._id] ? <span className="ml-2">{dlpId[post._id]}</span> :
//                                                 <span className="ml-2">0</span>}
//                                         </div>
//                                         <div>

//                                             <button
//                                                 type="button"
//                                                 className="btn btn-danger"
//                                                 data-toggle="modal"
//                                                 data-target={`#exampleModal-${post._id}`}>
//                                                 Delete
//                                             </button>


//                                             <div className="modal fade" id={`exampleModal-${post._id}`} tabIndex="-1" role="dialog" aria-labelledby={`exampleModalLabel-${post._id}`} aria-hidden="true">
//                                                 <div className="modal-dialog" role="document">
//                                                     <div className="modal-content">
//                                                         <div className="modal-header">
//                                                             <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
//                                                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                                                                 <span aria-hidden="true">&times;</span>
//                                                             </button>
//                                                         </div>
//                                                         <div className="modal-body">
//                                                             Are you sure you want to delete this post?
//                                                         </div>
//                                                         <div className="modal-footer">
//                                                             <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
//                                                             <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => deletePost(post)}>Yes</button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>

//     </div>
// )
