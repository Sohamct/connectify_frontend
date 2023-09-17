import React from 'react';
import {Followers} from './Followers';
import {Followings} from './Followings';



export const GetFolks = () => {
  return (
    <>
      <div>
        <h2>followers</h2>
        <ul className="list-group">
          
            <Followers/>
          
        </ul>

        <h2>followings</h2>
        <ul className="list-group">
        <Followings/>
        </ul>
      </div>

    </>

  );
};

export default GetFolks;
