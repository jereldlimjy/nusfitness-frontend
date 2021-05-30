import React, { useState, useEffect } from "react";
import Booking from "./Booking";

const Home = ({ handleAlert, loggedIn, setLoggedIn }) => {
  // const [ loggedIn, setLoggedIn ] = useState(false);

  // useEffect(() => {
  //     fetch('http://localhost:3000/isLoggedIn')
  //     .then(res => res.json())
  //     .then(data => {
  //         console.log(data);
  //         setLoggedIn(data.authenticated);
  //     })
  //     .catch((err) => {
  //         console.log(err);
  //         setLoggedIn(false);
  //     });
  // }, []);

  return (
    <div>
      {loggedIn ? (
        // <h1 className='text-center'>You are logged in!</h1>
        <Booking />
      ) : (
        <h1 className="text-center">Welcome to NUSFitness! :)</h1>
      )}
    </div>
  );
};

export default Home;
