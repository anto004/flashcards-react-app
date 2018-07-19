export const ADD_ALL_DECKS = "ADD_ALL_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const ADD_ALL_CARDS = "ADD_ALL_CARDS";

/**
 *
 * @param decks - an array of deck
 * @returns {{type: string, decks: *}}
 */
export const addAllDecks = (decks) => ({
    type: ADD_ALL_DECKS,
    decks
});

/**
 *
 * @param deck - an object with an array of cards
 * @returns {{type: string, deck: *}}
 */
export const addDeck = (deck) => ({
    type: ADD_DECK,
    deck
});

/**
 *
 * @param card - an object with deckId as one of it's keys
 * @returns {{type: string, card: *}}
 */
export const addCard = (card) => ({
    type: ADD_CARD,
    card
});

export const addAllCards = (cards) => ({
    type: ADD_ALL_CARDS,
    cards
});
