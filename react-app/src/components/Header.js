import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import LogOut from "./images/logout";
import BookOpen from "./images/book-open";
import CreditCard from "./images/credit-card";
import SearchCircle from "./images/search-circle";
import Hand from "./images/hand";

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
          <div className="border rounded-lg p-2">
            <BookOpen />
          </div>
        </Link>
        <Link to="/cards">
          <div className="border rounded-lg p-2">
            <CreditCard />
          </div>
        </Link>
        <Link to="/holds">
          <div className="border rounded-lg p-2">
            <Hand />
          </div>
        </Link>
        <Link to="/search">
          <div className="border rounded-lg p-2">
            <SearchCircle />
          </div>
        </Link>
        {loggedIn && (
          <button
            className="border rounded-lg p-2"
            onClick={() => Auth.signOut()}
          >
            <LogOut />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
