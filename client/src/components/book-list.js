import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loadBooks } from '../actions'
import Book from './book-item'


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
            <Book key={item.barcode} book={item}/>
      );
    });
  }

  render() {
    return (
      <div className="column">
        <h3 className="title is-3">Livres</h3>
        {this.createListItems()}
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
