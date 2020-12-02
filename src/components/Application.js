import React, { useContext, useEffect } from "react";
import ReactGA from "react-ga";
import SignIn from "./SignIn";
import { UserContext } from "../providers/UserProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import User from "./User";
import Cards from "./Cards";
import Books from "./Books";
import Header from "./Header";
import Holds from "./Holds";
import Footer from "./Footer";

function Application() {
  const { user } = useContext(UserContext);

  // send a pageview when the app init
  useEffect(() => {
    // Enable debug mode on the local development environment
    const isDev =
      !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, { debug: isDev });
    ReactGA.pageview(window.location.pathname);
  });

  const content = user ? (
    <Switch>
      <Route path="/user">
        <User />
      </Route>
      <Route path="/cards">
        <Cards />
      </Route>
      <Route path="/holds">
        <Holds />
      </Route>
      <Route path="/">
        <Books />
      </Route>
    </Switch>
  ) : (
    <SignIn />
  );

  return (
    <Router>
      <Header />
      <div className="mx-auto w-11/12 sm:w-5/6 md:w-3/4 py-8 px-4 sm:px-8 bg-gray-100">
        {content}
      </div>
      <Footer />
    </Router>
  );
}
export default Application;
