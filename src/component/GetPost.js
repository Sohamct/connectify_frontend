import React, { useEffect, useState } from 'react';
import axios from 'axios';


export const GetPost = (props) => {

    const [allPost, setAllPost] = useState([])
    useEffect(() => {
        getPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getPost = async () => {
        try {
            const host = "http://localhost:5500";
            const res = await axios.get(`${host}/api/post/getPost`, {
                headers: {
                    'auth-token' : localStorage.getItem('token'),
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
    

    return (
        <div className="container">
            <h1 className="my-4">Your Post</h1>

            {/* {allPost && allPost.map((data, index) => {
                return (<ShowPost description={"Description"} title={"My Title"} key={index} imageUrl={`./images/${data.image}`}/>)
            }) }  */}
            <div className="container mt-4">
                {allPost && (
                    <div className="row">
                        {allPost.map((post, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <div className="card">
                                    <img src={require(`./images/${post.image}`)} className="card-img-top" alt={""} />
                                    <div className="card-body">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text">{post.description}</p>
                                        <div className="d-flex justify-content-flex">
                                            {/* <LikePost />
                                            <CommentPost /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
};
