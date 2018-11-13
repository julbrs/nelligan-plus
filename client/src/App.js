import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.css'
import 'font-awesome/css/font-awesome.css';
import Header from './components/header'
import CardForm from './components/card-form'
import CardList from './components/card-list'
import BookList from './components/book-list'
import { Columns, Section, Container } from 'react-bulma-components/full';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
          <Section>
            <Container>
              <Columns>
                <Columns.Column>
                  <h3 className="title is-3">Cards</h3>
                  <p>Add a new card here !</p>
                  <CardForm />
                  <CardList />
                </Columns.Column>
                <BookList />
              </Columns>
            </Container>
          </Section>
      </div>
    );
  }
}

export default App;
