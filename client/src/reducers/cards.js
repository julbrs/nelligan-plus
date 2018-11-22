const initialState = []
export default (state=initialState, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      let index = state.findIndex(el => el.code === action.payload.code);
      if(index===-1)
        return [
            ...state,
            action.payload
          ]
      return state;
    case 'DELETE_CARD':
      return [
          ...state.slice(0, action.payload),
          ...state.slice(action.payload + 1)
      ]
    case 'LOAD_CARDS':
      return {
        cards: action.payload
      }
    case 'UPDATE_CARD':
      return state.map(card => {
        if(card.code === action.payload.code) {
          return {...card, ...action.payload};
        }
        else{
          return card;
        }
      })
    default:
    return state
  }
}