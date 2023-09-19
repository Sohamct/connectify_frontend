import React, { useEffect, useState } from 'react';
import { Followings } from './Followings';
import { Others } from './Others';
import { Requests } from './Requests';
import axios from 'axios';
import { Followers } from './Followers';
import { Followback } from './Followback';
import { PendingRequest } from './PendingRequest';

export const GetFolks = (props) => {

  const [followings, setFollowings] = useState([]);
  const [followback, setFollowback] = useState([]);
  const [requests, setRequest] = useState([]);
  const [others, setOthers] = useState();
  const [pendingRequest, setPendingRequest] = useState([]);
  const [followerRequested, setFollowerRequested] = useState([]);
  const [followersFollowings, setFollowersFollowings] = useState([]);
  const [onlyFollowers, setOnlyFollowers] = useState([]);

  useEffect(() => {
    getFollowings();
    getOthers();
    getRequests();
    getFollowback();
    getPendingRequest();
    getFollowers();
    // eslint-disable-next-line
  }, [])


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
  const getFollowers = async () => {
    try {
      const host = "http://localhost:5500";
      const res = await axios.post(`${host}/api/folk/getFollowers`, null, {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      console.log(res.data.commonRequestedUsers);
      console.log(res.data.commonUsers);
      console.log(res.data.onlyFollowers);
      setFollowerRequested(res.data.commonRequestedUsers)
      setFollowersFollowings(res.data.commonUsers)
      setOnlyFollowers(res.data.onlyFollowers);
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
      getFollowings();
      getOthers();
      getRequests();
      getFollowback();
      getPendingRequest();
      getFollowers();
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
      getFollowings();
      getOthers();
      getRequests();
      getFollowback();
      getPendingRequest();
      getFollowers();
    } catch (error) {
      console.error(error);
    }
  }

  const denieRequest = async (user) => {
    try {
      const host = "http://localhost:5500";
      const toId = user._id;
      console.log("making request: user._id: ", toId)
      const res = await axios.post(`${host}/api/folk/denieRequest`, { toId }, {
        headers: {
          'auth-token': localStorage.getItem('token'),
          'toId': toId
        }
      });
      console.log(res.data);
      getFollowings();
      getOthers();
      getRequests();
      getFollowback();
      getPendingRequest();
      getFollowers();
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
      getFollowings();
      getOthers();
      getRequests();
      getFollowback();
      getPendingRequest();
      getFollowers();

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
      getFollowings();
      getOthers();
      getRequests();
      getFollowback();
      getPendingRequest();
      getFollowers();
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
      getFollowings();
      getOthers();
      getRequests();
      getFollowback();
      getPendingRequest();
      getFollowers();
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
      getFollowings();
      getOthers();
      getRequests();
      getFollowback();
      getPendingRequest();
      getFollowers();
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
        <h2>Reuests</h2>
        <ul className="list-group">
          {requests.length !== 0 ?
            requests.map((data, index) => (
              <Requests key={index} data={data} denieRequest={denieRequest} acceptRequest={acceptRequest} />
            )) : "No requests"
          }
        </ul>

        <h2>Pending Request</h2>
        <ul className="list-group">
          {pendingRequest.length > 0 ? (
            pendingRequest.map((data, index) => (
              <PendingRequest key={index} data={data} cancelRequest={cancelRequest} />
            ))
          ) : (
            "No pending request"
          )}
        </ul>

        <h2>Followers</h2>
        <ul className="list-group">
          <Followers unFollow={unFollow} followback={followback} makeFollowback={makeFollowback} followerRequested={followerRequested}
            followersFollowings={followersFollowings} removeFollower={removeFollower} />

        </ul>

        <h2>followings</h2>
        <ul className="list-group">
          {followings.length > 0 ?
            (
              followings.map((data, index) => (
                <Followings key={index} data={data} unFollow={unFollow} />
              ))
            ) : "No followings"
          }

        </ul>

        <h2>Not Followers & Non Following</h2>
        <ul className="list-group">

          {others &&
            others.map((data, index) => (
              <Others key={index} data={data} makeRequest={makeRequest} />
            ))
          }


        </ul>
      </div>

    </>

  );
};

export default GetFolks;
