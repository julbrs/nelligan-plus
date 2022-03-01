import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Books from "./Books";
import Cards from "./Cards";
import Holds from "./Holds";
import { Auth, Hub, API } from "aws-amplify";

import "@aws-amplify/ui-react/styles.css";
import SignIn from "./SignIn.js";
import History from "./History";

function App() {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          setUser(data);
          break;
        case "signOut":
          setUser(null);
          setCards([]);
          break;
        case "customOAuthState":
          break;
        default:
      }
    });

    Auth.currentAuthenticatedUser()
      .then((currentUser) => {
        setUser(currentUser);
        return API.get("main", "/cards");
      })
      .then((data) => setCards(data))
      .catch(() => console.log("Not signed in"));
  }, []);

  return (
    <Router>
      <Header />
      <div className="mx-auto w-11/12 sm:w-5/6 md:w-3/4 py-8 px-4 sm:px-8 bg-gray-100">
        {user ? (
          <Routes>
            <Route path="/cards/:card/history" element={<History />} />
            <Route
              path="/cards"
              element={<Cards cards={cards} setCards={setCards} />}
            />
            <Route path="/holds" element={<Holds cards={cards} />} />
            <Route path="/" element={<Books cards={cards} />} />
          </Routes>
        ) : (
          <SignIn />
        )}
      </div>
      <Footer />
    </Router>
  );
}
export default App;
