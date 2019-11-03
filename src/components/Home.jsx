import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [values, setValues] = useState({
    loggedIn: localStorage.getItem('token') ? true : false,
    currentUser: ''
  });
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token != null) {
      axios('/user_auth/current_user', {
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(response => {
          if (response.data.username !== undefined) {
            setValues({ loggedIn: true, currentUser: response.data.username });
          } else if (response.data.detail == 'Signature has expired.') {
            localStorage.removeItem('token');
            setValues({ loggedIn: false, currentUser: '' });
            alert('Log In Expired. Log In Again');
          }
        })
        .catch(err => console.log(err));
    }
  });
  return (
    <div>
      {values.loggedIn == true && localStorage.token != undefined
        ? `${values.currentUser} is logged in`
        : 'Please Log In.'}
    </div>
  );
}

export default Home;
