import axios from 'axios';
import { useEffect, useState } from 'react';
import { AllPost } from './AllPost';

export function Home({ showAlert }) {
  const [valid, setValid] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const host = "http://localhost:5500";
        const token = localStorage.getItem('token');
        
        if (!token) {
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
        
        showAlert("An error occurred while connecting with Connectify", "danger");
        console.error(error);
      }
    }

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <>
      {valid ? <AllPost /> : <h3>Please Login/Signup to use Connectify</h3>}
    </>
  )
}