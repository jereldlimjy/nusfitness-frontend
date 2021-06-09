import React from "react";
import Booking from "./Booking";

const Home = ({ handleAlert, loggedIn, setLoggedIn }) => {
  return (
    <div>
      {loggedIn ? (
        // <h1 className='text-center'>You are logged in!</h1>
        <Booking handleAlert={handleAlert} />
      ) : (
        <h1 className="text-center">Welcome to NUSFitness! :)</h1>
      )}
    </div>
  );
};

export default Home;
