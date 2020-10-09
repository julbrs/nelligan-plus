import React, {useContext, useState, useEffect} from 'react'
import BookItem from './item'
import {CardsContext} from '../Card'
import axios from 'axios'

import Columns from 'react-bulma-components/lib/components/columns'

const api = process.env.REACT_APP_API

const BookList = () => {
    const {cards} = useContext(CardsContext)
    const [books, setBooks] = useState([]);

    useEffect(() => {
      Promise.all(cards.map(card => axios.get(`${api}books`, {
        params: {
          code: card.code,
          pin: card.pin
        }
      }).then(res => {
        // add card info to the book
        return res.data.books.map(book => {
          book.card = card
          return book
        })
      })
      )).then((data) => {
        // flatten the list after
        setBooks(data.flat())
      })
      
    }, [cards] /* refresh only if cards is changing not books ! */)
    
    const listBooks = books.map(book => 
        <BookItem key={book.barcode} book={book}/>
      );

    return (
        <div className="column">
          <h3 className="title is-3">Livres</h3>
          <Columns multiline={true}>
            {listBooks}
          </Columns>
        </div>
      )
}

export default BookList;
