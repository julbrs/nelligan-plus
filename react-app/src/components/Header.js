import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(() => {
        setLoggedIn(true);
      })
      .catch(() => setLoggedIn(false));
  }, []);

  return (
    <div className="bg-teal-800 px-2">
      <h1 className="text-5xl font-bold text-white">Nelligan++</h1>
      <div className="pl-4 mt-4 pb-4 text-gray-200 font-bold flex space-x-2">
        <Link to="/">
          <div className="border rounded-lg p-3">Books</div>
        </Link>
        <Link to="/cards">
          <div className="border rounded-lg p-3">Cards</div>
        </Link>
        <Link to="/holds">
          <div className="border rounded-lg p-3">Holds</div>
        </Link>
        <Link to="/search">
          <div className="border rounded-lg p-3">Search</div>
        </Link>
        {loggedIn && (
          <button
            className="border rounded-lg p-3"
            onClick={() => Auth.signOut()}
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
