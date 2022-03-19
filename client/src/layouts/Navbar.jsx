import React from 'react';
import { useParams } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="Searchbar">
        <input type="text" placeholder="Advance search, filters etc." />
      </div>
      <div className="Comparison">
        <div className="CompareButton"></div>
      </div>
    </div>
  );
};

export default Navbar;
