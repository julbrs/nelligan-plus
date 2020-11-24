import React, { Component, createContext } from "react";
import { auth, generateUserDocument, persistUser } from "../firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth, { cards: [] });
      this.setState({ user });
    });
  };

  render() {
    let { user } = this.state;

    const setCards = async (cards) => {
      // set state
      user.cards = cards;
      this.setState({ user });

      // persist state in user document
      await persistUser(user);
    };

    return (
      <UserContext.Provider value={{ user, setCards }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
