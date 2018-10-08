import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import 'bulma/css/bulma.css';
import Header from './components/header'
import CardForm from './components/card-form'
import CardList from './components/card-list'
import BookList from './components/book-list'
import {Section} from 'reactbulma'

class App extends Component {

  render() {
    return (
      <div>
        <Header />
          <Section>
            <div className="container">
              <div className="columns">
                <div className="column">
                  
                  <CardForm />
                  <CardList />
                </div>
                <BookList />
              </div>
            </div>
          </Section>
      </div>
    );
  }
}

export default App;
