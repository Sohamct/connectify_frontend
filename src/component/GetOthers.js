// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Others } from './Others';

// export const GetOthers = (props) => {

//   const [others, setOthers] = useState();

//   const makeRequest = async (user) => {
//     try {
//       const host = "http://localhost:5500"
//       const toId = user._id;
//       console.log(toId);
//       const res = await axios.post(`${host}/api/folk/makeRequest`, {toId}, {
//         headers: {
//           'auth-token': localStorage.getItem('token'),
//           // 'toId' : toId

//         }
//       });
//       if(res.data.success){
//         console.log(res.data.message);
//         getOthers();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }


//   useEffect(() => {
//     getOthers();
//   }, [])

//   const getOthers = async () => {
//     try {
//       const host = "http://localhost:5500";
//       const res = await axios.post(`${host}/api/folk/getNonMutualUsers`, null, {
//         headers: {
//           'auth-token': localStorage.getItem('token')
//         }
//       });
//       if(res.data.success){
//         console.log(res.data.nonMutualUsers);
//         setOthers(res.data.nonMutualUsers);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <>
//       <div>
//         <h2>Not Followers & Non Following</h2>
//         <ul className="list-group">

//           <Others others={others} makeRequest={makeRequest}/>

//         </ul>
//       </div>

//     </>

//   );
// };

// export default GetOthers;
