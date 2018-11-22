const initialState = []
export default (state=initialState, action) => {
  switch (action.type) {
    case 'LOAD_BOOKS':
      // add books andorder by due date
      return state.concat(action.payload).sort(function (a, b) {
          return a.duedate > b.duedate ? 1 : -1;
        });
    case 'DELETE_BOOKS':
      return state.filter(book => book.card.code !== action.payload.code);
    case 'LOAD_BOOK_INFO':
      return state.map(book => {
        if(book.record === action.payload.record) {
          return {...book, ...action.payload};
        }
        else{
          return book;
        }
      })
      case 'RENEW_BOOK':
      return state.map(book => {
        if(book.record === action.payload.record) {
          return {...book, ...action.payload};
        }
        else{
          return book;
        }
      }).sort(function (a, b) {
          return a.duedate > b.duedate;
        });
    default:
      return state
  }
}