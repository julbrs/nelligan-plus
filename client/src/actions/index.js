import axios from 'axios'

const url = process.env.REACT_APP_API || "http://localhost:5000/api/"

export const addCardLoadBooks = (card) => {
  return (dispatch) => {
    dispatch(addCard(card));
    dispatch(loadBooks(card));
  }
}

export const loadBooks = (card) => {
  return (dispatch) => {
    axios.get(`${url}books`, {
    params: {
      code: card.code,
      pin: card.pin
    }
  })
    .then((res) => {

      card.err = undefined
      let books = res.data.books.map(book => {
        book.card = card;
        return book;
      })
      dispatch({type:'LOAD_BOOKS', payload: books})
      if(res.data.fine !== '') {
        card.fine = res.data.fine
      }
      else {
        card.fine = undefined
      }
      dispatch({type:'UPDATE_CARD', payload: card})
    }).catch((err) => {
      card.err = err.response.data.message
      console.log(card.err)
      dispatch({type:'UPDATE_CARD', payload: card})
    })
  }
}

export const loadBookInfo = (book) => {
  return (dispatch) => {
    axios.get(`${url}book/${book.record}`)
    .then((res) => {
      let bookinfo = res.data;
      dispatch({type:'LOAD_BOOK_INFO', payload: bookinfo})
    }).catch((err) => {
      console.log(err)
    })
  }
}

export const renewBook = (book) => {
  return (dispatch) => {
    axios.get(`${url}book/renew/${book.barcode}`, {
    params: {
      code: book.card.code,
      pin: book.card.pin,
      rid: book.rid,
      rvalue: book.rvalue
    }
  })
    .then((res) => {
      let result = res.data;
      if(result.date !== undefined) {
        book.duedate = result.date
        book.renew = parseInt(book.renew) + 1
        dispatch({type:'RENEW_BOOK', payload: book})
      }
      else {
        book.err = result.msg
        dispatch({type:'RENEW_BOOK', payload: book})
      }
    }).catch((err) => {
      console.log(err)
      book.err = err.response.data.errors
      dispatch({type:'RENEW_BOOK', payload: book})
    })
  }
}

export const addCard = (card) => {
  return {
    type: 'ADD_CARD',
    payload: card
  }
}

export const deleteCard = (card) => {
  return (dispatch) => {
    dispatch({
      type: 'DELETE_CARD',
      payload: card
    });
    dispatch({
      type: 'DELETE_BOOKS',
      payload: card
    });
  }
}
