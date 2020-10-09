import React, { Component } from 'react'
import {connect} from 'react-redux'
import { loadBooks } from '../actions'
import Book from './book-item'

import Columns from 'react-bulma-components/lib/components/columns'

class BookList extends Component {

  componentDidMount() {
    this.props.cards &&
    this.props.cards.map(card => {
      return this.props.loadBooks(card);
    });
  }

  componentDidUpdate() {
  }

  createListItems() {
    return this.props.books.map(item => {
      return (
        <Columns.Column size={6} key={item.code}>

            <Book key={item.code} book={item}/>
        </Columns.Column>
      );
    });
  }

  render() {
    return (

      <div className="column">
        <h3 className="title is-3">Livres</h3>
        <Columns multiline={true}>

        {this.createListItems()}
        </Columns>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books,
    cards: state.cards,
    booksLoading: state.booksLoading
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadBooks: (card) => dispatch(loadBooks(card))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(BookList);
