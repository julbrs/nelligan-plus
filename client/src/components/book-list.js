import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loadBooks } from '../actions'
import Book from './book-item'


class BookList extends Component {
//   constructor(props) {
//   super(props);
//   // this.state = {
//   //   loading: true
//   // }
// }

  componentDidMount() {
    this.props.cards &&
    this.props.cards.map(card => {
      return this.props.loadBooks(card);
    });
  }

  componentDidUpdate() {
    //this.setState({loading: !this.state.loading})
  }

  createListItems() {
    return this.props.books.map(item => {
      return (
            <Book key={item.barcode} book={item}/>
      );
    });
  }

  // bookLoading() {
  //   if(this.state.loading) {
  //     return (
  //       <BounceLoader
  //         sizeUnit={"px"}
  //         size={150}
  //         color={'rgb(0, 209, 178)'}
  //         loading={this.state.loading}
  //         />
  //     );
  //   }
  //   else {
  //     return (
  //         <div></div>
  //     );
  //
  //   }
  // }

  render() {
    return (
      <div className="column">
        <h3 className="title is-3">Books</h3>
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
