import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';


export function Home() {
  const [allPost, setAllPost] = useState([]);
  const [likedPostIds, setLikedPostIds] = useState([]);
  const [disLikedPostIds, setDislikedsPostIds] = useState([]);

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

  const getLikedPosts = async () => {
    try {
      const host = 'http://localhost:5500';
      const res = await axios.get(`${host}/api/post/getLikedPost`, {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      });
      console.log(res.data.LikedPostIds);
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
      console.log(res.data.DislikedPostIds);
      setDislikedsPostIds(res.data.DislikedPostIds);
    } catch (error) {
      console.error(error);
    }
  };

  const makeLikePost = async (post) => {
    try {
      const postId = post._id;
      const host = 'http://localhost:5500';
      const res = await axios.post(`${host}/api/post/likePost`, {postId},{
        headers: {
          'auth-token': localStorage.getItem('token'),
          'postId' : postId
        },
      });

      if(res.data.status){
        console.log('liked post')
        getLikedPosts();
        getDislikedPosts()
      }else{
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
      const res = await axios.post(`${host}/api/post/disLikePost`, {postId}, {
        headers: {
          'auth-token': localStorage.getItem('token'),
          'postId' : postId
        },
      });

      if(res.data.status){
        console.log('Disliked post')
        getLikedPosts();
        getDislikedPosts()
      }else{
        console.log('Disliked post failed')
      }
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (post) => {
    try {
      const postId = post._id;
      const host = 'http://localhost:5500';
      const res = await axios.post(`${host}/api/post/remove`, {postId}, {
        headers: {
          'auth-token': localStorage.getItem('token'),
          'postId' : postId
        },
      });

      if(res.data.status){
        console.log('remove');
        getLikedPosts();
        getDislikedPosts()
      }else{
        console.log('remove failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllPost();
    getLikedPosts();
    getDislikedPosts()
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
              {/* <CommentPost /> */}
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

// import React, { useEffect } from 'react'
// import axios from 'axios';
// import { useState } from 'react';
// import { LikePost } from './LikePost';
// import { CommentPost } from './CommentPost';

// export function Home (){
//   const [allPost, setAllPost] = useState([]);
  
//   const fetchAllPost = async () => {
//     try {
//       const host = "http://localhost:5500";
//       const res = await axios.get(`${host}/api/post/fetchAllPosts`, {
//         headers: {
//           'auth-token': localStorage.getItem('token'),
//         }
//       });

//       // console.log("res.data.posts: ", res.data.posts);
//       setAllPost(res.data.posts);
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   useEffect(() => {
//     fetchAllPost();
//   }, [])

//   return (
//     <div className="container">
//             <h1 className="my-4">All Post</h1>

//             {/* {allPost && allPost.map((data, index) => {
//                 return (<ShowPost description={"Description"} title={"My Title"} key={index} imageUrl={`./images/${data.image}`}/>)
//             }) }  */}
//             <div className="container mt-4">
//                 {allPost && (
//                     <div className="row">
//                         {allPost.map((post, index) => (
//                             <div key={index} className="col-md-4 mb-4">
//                                 <div className="card">
//                                     <img src={require(`./images/${post.image}`)} className="card-img-top" alt={""} />
//                                     <div className="card-body">
//                                         <h5 className="card-title">{post.title}</h5>
//                                         <p className="card-text">{post.description}</p>
//                                         <div className="d-flex justify-content-flex">
//                                             <LikePost />
//                                             <CommentPost />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//         </div>
//   )
// }