import React from 'react';
import { useParams } from 'react-router-dom';
import "./../styles/Navbar.css"
const Navbar = () => {
  return (
    <div className="Navbar flex flex-row justify-between p-10 items-center">
      <div className="Searchbar flex flex-row items-center">
        <input className="SearchText px-3.5" type="text" placeholder="Advance search, filters etc." />
      </div>
      <div className="Comparison">
        <button className="CompareAnalytics">
            Compare Analytics
        </button>
      </div>
    </div>
  );
};

export default Navbar;
