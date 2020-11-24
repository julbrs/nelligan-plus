import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import { UserContext } from "../providers/UserProvider";
import User from "./User";
import Cards from "./Cards";
import Books from "./Books";
import Header from "./Header";

function Application() {
  const { user } = useContext(UserContext);

  const content = user ? (
    <div>
      <User />
      <Cards />
      <Books />
    </div>
  ) : (
    <Router>
      <SignIn path="/" />
    </Router>
  );

  return (
    <div>
      <Header />
      <div className="mx-auto w-11/12 sm:w-5/6 md:w-3/4 py-8 px-4 sm:px-8 bg-gray-100">
        {content}
      </div>
    </div>
  );
}
export default Application;
