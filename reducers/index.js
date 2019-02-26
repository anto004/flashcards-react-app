import {
  ADD_ALL_DECKS,
  ADD_DECK,
  ADD_CARD,
  ADD_ALL_CARDS,
  DELETE_DECK,
  DELETE_CARD,
  EDIT_DECK_TITLE,
} from "../actions";

export const DECK = "deck";
export const CARD = "card";

const initialDeckState = {
  deck: [],
  card: []
};

export const reducer = (state = initialDeckState, action) => {
  const {decks, deck, card, cards} = action;

  switch (action.type) {
    case ADD_ALL_DECKS:
      return {
        ...state,
        [DECK]: decks
      };
    case ADD_DECK:
      return {
        ...state,
        [DECK]: state[DECK].concat([deck])
      };

    case ADD_CARD:
      return {
        ...state,
        [CARD]: state[CARD].concat([card])
      };
    case ADD_ALL_CARDS:
      return {
        ...state,
        [CARD]: state[CARD].concat(cards)
      };
    case DELETE_DECK:
      return {
        ...state,
        [DECK]: state[DECK].filter((currentDeck) => currentDeck.id !== deck.id)
      };
    case DELETE_CARD:
      return{
        ...state,
        [CARD]: state[CARD].filter((currentCard) => currentCard.id !== card.id)
      };
    case EDIT_DECK_TITLE:
      return {
        ...state,
        [DECK]: state[DECK].filter((currentDeck) => {
          if(currentDeck.id === deck.id){
            return deck;
          }
          return currentDeck;
        })
      };
    default:
      return state;
  }
};