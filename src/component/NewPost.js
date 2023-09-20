import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const NewPost = (props) => {

  const [post, setPost] = useState({ title: '', description: '', image: null });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", post.image);
    formData.append("title", post.title);
    formData.append("description", post.description);

    const host = "http://localhost:5500"
    const token = localStorage.getItem('token');
    try {
      const result = await axios.post(
        `${host}/api/post/newPost`,
        formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": token
          }
        }
      );

      console.log(result.status);
      if (result.status === 200) {
        props.showAlert("Post added successfully", "success")
        navigate('/newPost');
      } else {
        props.showAlert(result.status, "danger");
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        props.showAlert(err.response.data.error, "danger");
      } else {
        console.log(err);
        props.showAlert("An error occurred", "danger");
      }
    }
    setPost({title: '', description: '', image: null});
  }
  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log(selectedFile);
      setPost({ ...post, image: selectedFile });
    } else {
      console.log("No file selected");
      // You can optionally provide user feedback here
    }
  }

  return (
    <div className="container">
      <h1 className="my-4">Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={post.title}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            value={post.description}
            onChange={onChange}
            className="form-control"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image:</label>
          <input
            type="file"
            id="image"
            accept='image/*'
            name="image"
            className="form-control"
            onChange={onFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>    </div>

  );
};
