import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-teal-800 px-2">
      <h1 className="text-5xl font-bold text-white">Nelligan++</h1>
      <div className="pl-4 pb-4 text-gray-400 font-bold flex space-x-2">
        <Link to="/">
          <div className="border rounded-lg p-3">Books</div>
        </Link>
        <Link to="/cards">
          <div className="border rounded-lg p-3">Cards</div>
        </Link>
        <Link to="/holds">
          <div className="border rounded-lg p-3">Holds</div>
        </Link>
        <Link to="/user">
          <div className="border rounded-lg p-3">User</div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
