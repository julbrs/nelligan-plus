const initialState = []
export default (state=initialState, action) => {
  switch (action.type) {
    case 'LOAD_BOOKS':
      // add books andorder by due date
      return state.concat(action.payload).sort(function (a, b) {
          return a.duedate > b.duedate;
        });
    case 'DELETE_BOOKS':
      return state.filter(book => book.code !== action.payload.code);
    case 'LOAD_BOOK_INFO':
      return state.map(book => {
        if(book.record === action.payload.record) {
          return {...book, ...action.payload};
        }
        else{
          return book;
        }
      })
    default:
      return state
  }
}