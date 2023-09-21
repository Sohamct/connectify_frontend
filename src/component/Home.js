import axios from 'axios';
import { useEffect, useState } from 'react';
import { AllPost } from './AllPost';
import { Login } from './Login';

export function Home({ showAlert }) {
  const [valid, setValid] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const host = "http://localhost:5500";
        const token = localStorage.getItem('token');
        
        if (!token) {
          // showAlert("Please Login/Signup to use Connectify", "danger");
          return;
        }
        
        const res = await axios.get(`${host}/api/auth/validateUser`, {
          headers: {
            'auth-token': token,
          },
        });
        
        if (res.data.status) {
          setValid(true);
        }
        
        console.log(res);
      } catch (error) {
        // Handle errors (e.g., token verification failure)
        showAlert("An error occurred while connecting with Connectify", "danger");
        console.error(error);
      }
    }

    fetchUserData();
  }, []); // Empty dependency array to run this effect only once

  return (
    <>
      {valid ? <AllPost /> : <h3>Please Login/Signup to use Connectify</h3>}
    </>
  )
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