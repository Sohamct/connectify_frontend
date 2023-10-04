import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

export const ProfilePage = (props) => {
  const [profileImage, setProfileImage] = useState({ image: null });
  const [user, setUser] = useState();

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
        setUser(result.data.user);
      } else {
        props.showAlert('Some error occurred while getting profile', 'danger');
      }
    } catch (err) {
      console.log(err);
      props.showAlert(err.response.data.error, "danger");
    }
    
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", profileImage.image);

    const host = "http://localhost:5500";

    const token = localStorage.getItem('token');
    try {
      const result = await axios.post(
        `${host}/api/auth/updateProfile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token': token
          }
        }
      )
      if (result.data.status === "ok") {
        setProfileImage(result.data.profile.image);
        props.showAlert('Profile is updated successfully', 'success');
      } else {
        props.showAlert('Some error occurred while updating profile', 'danger');
      }
    } catch (err) {
      console.log(err);
      props.showAlert(err.response.data.error, "danger");
    }
    setTimeout(()=>{
      getProfilePath();
    }, 1500)
    
  }

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log(selectedFile);
      setProfileImage({ ...profileImage, image: selectedFile });
    } else {
      console.log("No file selected");
    }
  }

  useState(() => {
    getProfilePath();
    // eslint-disable-next-line
  }, [])

  
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
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card mb-3">
            {user && (user.image == null ?
              <img style={{ height: '200px', width: '190px' }} src={require(`./images/profile.jpg`)} className="card-img-top" alt={""} /> :
              <img style={{ height: '200px', width: '190px' }} className="custom-card-img" src={require(`./images//${user.image}`)} alt={""} />
            )}
              {user && <div className="card-body">
                <label htmlFor="image" className="form-label">Update Profile photo: </label>
                <input
                  type="file"
                  id="image"
                  accept='image/*'
                  name="image"
                  className="form-control"
                  onChange={onFileChange}
                />
                <button type="submit" className="btn btn-primary mt-3" onClick={handleClick}>Save</button>
                <div className="mt-3">
                  <label>First Name</label>
                  <input type="text" className="form-control" value={`${user.firstName}`} disabled/>
                </div>
                <div className="mt-3">
                  <label>Last Name</label>
                  <input type="text" className="form-control" value={`${user.lastName}`} disabled/>
                </div>
                <div className="mt-3">
                  <label>Email</label>
                  <input type="text" className="form-control" value={`${user.email}`} disabled/>
                </div>
                <div className="mt-3">
                  <label>Date of Birth:</label>
                  <input type="text" className="form-control" value={formatDate(user.dob)} disabled/>
                </div>
                <div className="mt-3">
                  <label>Gender</label>
                  <input type="text" className="form-control" value={`${user.gender}`} disabled/>
                </div>
                <div className="mt-3">
                  <label>Date of Account Creation:</label>
                  <input type="text" className="form-control" value={formatDate(user.date)} disabled/>
                </div>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}
