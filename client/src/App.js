import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.css'
import 'font-awesome/css/font-awesome.css';
import Header from './components/header'
import Cards from './components/cards'
import BookList from './components/book-list'
import { Section, Container } from 'react-bulma-components/full';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Container>
          <Cards />
          <Section>
            <BookList />
          </Section>
          </Container>
      </div>
    );
  }
}

export default App;
