import React, {useState} from 'react'

export const CardsContext = React.createContext([])

// load context from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cards');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

// Create a provider for components to consume and subscribe to changes
export const CardsContextProvider = props => {

    const [cards, setCardsBasic] = useState(loadState());

    const setCards = (cards) => {
      // save the state
      setCardsBasic(cards)
      // save to localStorage
      try {
        const serializedState = JSON.stringify(cards);
        localStorage.setItem('cards', serializedState);
      } catch (err) {
        // ignore write errors
      }
    };
   
    return (
      <CardsContext.Provider value={{cards, setCards}}>
        {props.children}
      </CardsContext.Provider>
    );
  };


//export const CardsConsumer = CardsContext.Consumer

//export default CardsContext