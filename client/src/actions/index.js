import axios from 'axios'

 const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"
//const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://my-json-server.typicode.com/bobman38/nelligan2/"

export const addCardLoadBooks = (card) => {
  return (dispatch) => {
    dispatch(addCard(card));
    dispatch(loadBooks(card));
  }
}

export const loadBooks = (card) => {
  return (dispatch) => {
    axios.get(`${url}books`, {
    params: card
  })
    .then((res) => {
      let books = res.data.map(book => {
        book.code = card.code;
        return book;
      })
      dispatch({type:'LOAD_BOOKS', payload: books})
    }).catch((err) => {
      console.log(err)
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

export const addCard = (card) => {
  return {
    type: 'ADD_CARD',
    payload: card
  }
}

export const deleteCard = (card) => {
  return {
    type: 'DELETE_CARD',
    payload: card
  }
}

  export const deleteBooks = (card) => {
    return {
      type: 'DELETE_BOOKS',
      payload: card
    }
}