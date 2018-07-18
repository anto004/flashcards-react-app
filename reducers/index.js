import {ADD_ALL_DECKS, ADD_DECK, ADD_CARD} from "../actions";

export const DECK = "deck";
export const CARD = "card";

const initialDeckState = {
    deck: [],
    card: []
};

export const reducer = (state = initialDeckState, action) => {
    const {decks, deck, card} = action;

    switch(action.type){
        case ADD_ALL_DECKS:
            return {
                ...state,
                [DECK]: decks
            };
        case ADD_DECK:
            return{
                ...state,
                [DECK]: state[DECK].concat([deck])
            };

        case ADD_CARD:
            return{
                ...state,
                [CARD]: state[CARD].concat([card])
            };
        default:
            return state;
    }
};