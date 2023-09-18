import React, { useEffect, useState } from 'react';
import { Followings } from './Followings';
import { Others } from './Others';
import { Requests } from './Requests';
import axios from 'axios';
import { FollowerFollowing } from './FollowerFollowing';
import { Followback } from './Followback';
import {PendingRequest} from './PendingRequest';

export const GetFolks = (props) => {

  const [followersFollowings, setFollowersFollowings] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followback, setFollowback] = useState([]);
  const [requests, setRequest] = useState([]);
  const [others, setOthers] = useState();
  const [pendingRequest, setPendingRequest] = useState([]);

  const getOthers = async () => {
    try {
      const host = "http://localhost:5500";
      const res = await axios.post(`${host}/api/folk/getNonMutualUsers`, {}, {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      if (res.data.success) {
        console.log(res.data.nonMutualUsers);
        console.log("nonMutualUsers ...")
        setOthers(res.data.nonMutualUsers);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFollowersFollowings();
    getFollowings();
    getOthers();
    getRequests();
    getFollowback();
    getPendingRequest();
    // eslint-disable-next-line
  }, [])

  const getFollowersFollowings = async () => {
    try {
      const host = "http://localhost:5500";
      const res = await axios.post(`${host}/api/folk/getFollowersFollowing`, null, {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      console.log(res.data.result);
      setFollowersFollowings(res.data.result);
    } catch (error) {
      console.error(error);
    }
  }

  const getFollowings = async () => {
    try {
      const host = "http://localhost:5500";
      const res = await axios.post(`${host}/api/folk/getFollowings`, null, {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      console.log(res.data.followingsUsers);
      setFollowings(res.data.followingsUsers);
    } catch (error) {
      console.error(error);
    }
  }
  const getPendingRequest = async () => {
    try {
      const host = "http://localhost:5500";
      const res = await axios.post(`${host}/api/folk/getPendingRequest`, null, {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      console.log(res.data.pendingRequestsUsers);
      setPendingRequest(res.data.pendingRequestsUsers);
    } catch (error) {
      console.error(error);
    }
  }
  // from followback
  const makeRequest = async (user) => {
    try {
      const host = "http://localhost:5500";
      const toId = user._id;
      console.log("making request: user._id: ", toId)
      const res = await axios.post(`${host}/api/folk/makeRequest`, { toId }, {
        headers: {
          'auth-token': localStorage.getItem('token'),
          'toId': toId
        }
      });
      console.log(res);
      getOthers();
      getRequests();
      getPendingRequest();
    } catch (error) {
      console.error(error);
    }
  }
  const cancelRequest = async (user) => {
    try {
      const host = "http://localhost:5500";
      const toId = user._id;
      console.log("making request: user._id: ", toId)
      const res = await axios.post(`${host}/api/folk/cancelRequest`, { toId }, {
        headers: {
          'auth-token': localStorage.getItem('token'),
          'toId': toId
        }
      });
      console.log(res.data);
      getOthers();
      getRequests();
      getPendingRequest();
    } catch (error) {
      console.error(error);
    }
  }

  const getRequests = async () => {
    try {
      const host = "http://localhost:5500";
      const res = await axios.post(`${host}/api/folk/getRequests`, null, {
        headers: {
          'auth-token': localStorage.getItem('token'),
        }
      });

      console.log("res.data.requestUsers", res.data.requestUsers);
      setRequest(res.data.requestUsers);
      getFollowersFollowings();
    } catch (error) {
      console.error(error);
    }
  }

  const acceptRequest = async (user) => {
    try {
      const host = "http://localhost:5500";
      const toId = user._id;
      const res = await axios.post(`${host}/api/folk/acceptRequest`, { toId }, {
        headers: {
          'auth-token': localStorage.getItem('token'),
          'toId': toId
        }
      });
      console.log(res.data);
      getRequests();
      getFollowersFollowings();
      getFollowback();
      getFollowings();
    } catch (error) {
      console.error(error);
    }
  }

  const unFollow = async (user) => { // called from following
    try {
      const host = "http://localhost:5500";
      const toId = user._id;
      const res = await axios.post(`${host}/api/folk/unfollow`, { toId }, {
        headers: {
          'auth-token': localStorage.getItem('token'),
          'toId': toId
        }
      });
      console.log("unfollow: req.data", res.data);
      getFollowersFollowings();
      getOthers();
      getFollowings();

    } catch (error) {
      console.error(error);
    }
  }

  const removeFollower = async (user) => {
    try {
      const host = "http://localhost:5500";
      const toId = user._id;
      const res = await axios.post(`${host}/api/folk/removeFollower`, { toId }, {
        headers: {
          'auth-token': localStorage.getItem('token'),
          'toId': toId
        }
      });
      console.log(res.data);
      getFollowersFollowings();
      getFollowings();
    } catch (error) {
      console.error(error);
    }
  }
  const makeFollowback = async (user) => {
    try {
      const host = "http://localhost:5500";
      const toId = user._id;
      const res = await axios.post(`${host}/api/folk/makeFollowback`, { toId }, {
        headers: {
          'auth-token': localStorage.getItem('token'),
          'toId': toId
        }
      });
      console.log(res.data);
      getFollowback();
      getRequests();
      getFollowersFollowings();
    } catch (error) {
      console.error(error);
    }
  }

  const getFollowback = async () => {
    try {
      const host = "http://localhost:5500";

      const res = await axios.post(`${host}/api/folk/getFollowbacks`, {}, {
        headers: {
          'auth-token': localStorage.getItem('token'),
        }
      });
      console.log(res.data);
      setFollowback(res.data.followbackUsers);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div>

        <h2>Not Followers & Non Following</h2>
        <ul className="list-group">

          {others &&
            others.map((data, index) => (
              <Others key={index} data={data} makeRequest={makeRequest} />
            ))
          }


        </ul>
        <h2>Reuests</h2>
        <ul className="list-group">
          {requests &&
            requests.map((data, index) => (
              <Requests key={index} data={data} acceptRequest={acceptRequest} />
            ))
          }
        </ul>
        <h2>Pending Request</h2>
        <ul className="list-group">
          {pendingRequest &&
            pendingRequest.map((data, index) => (
              <PendingRequest key={index} data={data} cancelRequest={cancelRequest}/>
            ))
          }

        </ul>
        <h2>Followbacks</h2>
        <ul className="list-group">
          {followback &&
            followback.map((data, index) => (
              <Followback key={index} data={data} makeFollowback={makeFollowback} />
            ))
          }
        </ul>
        <h2>followers & following</h2>
        <ul className="list-group">
          {followersFollowings &&
            followersFollowings.map((data, index) => (
              <FollowerFollowing key={index} data={data} removeFollower={removeFollower} />
            ))
          }

        </ul>

        <h2>followings</h2>
        <ul className="list-group">
          {followings &&
            followings.map((data, index) => (
              <Followings key={index} data={data} unFollow={unFollow} />
            ))
          }

        </ul>
      </div>

    </>

  );
};

export default GetFolks;
