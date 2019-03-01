import {AsyncStorage} from "react-native";
export const FLASHCARD_KEY = "flashcard";

export async function fetchFlashCardResults() {
    try {
        const value = await AsyncStorage.getItem(FLASHCARD_KEY);
        if(value){
            return AsyncStorage.getItem(FLASHCARD_KEY);
        }
        console.log("value is null");
    } catch (error) {
        console.warn("Error fetching flashcards", error);
    }
}

export function removeAllFlashCards() {
  return AsyncStorage.removeItem(FLASHCARD_KEY)
      .then((results) => {
        console.log("Removed all flashcards", results)
      })
}

export const saveDeck = (id, title) => {
    const deck = {
        [title]: {
            "id": id,
            "title": title,
            "cards": []
        }};

    return AsyncStorage.mergeItem(FLASHCARD_KEY, JSON.stringify(deck), () => {
                AsyncStorage.getItem(FLASHCARD_KEY, (err, results) => {
                    console.log("saveDeck: ", results)
                })
        });
};

export const saveCard = (deckId, card) => {
    fetchFlashCardResults()
        .then((results) => {
            const decks = JSON.parse(results);
            Object.keys(decks).map((deck) => {
                if(decks[deck].id === deckId){
                    decks[deck].cards.push(card)
                }
            });
            //save new flashcards to database
            return AsyncStorage.mergeItem(FLASHCARD_KEY, JSON.stringify(decks), () => {
                    AsyncStorage.getItem(FLASHCARD_KEY, (err, results) => {
                        console.log("saveCard: ", results)
                    })
                });
        });
};

export const deleteDeckAPI = (deck) => {
  fetchFlashCardResults()
      .then((results) => {
        var copyDecks = JSON.parse(results);
        delete copyDecks[deck.title];

        AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(copyDecks))
      })
};

export const deleteCardAPI = (card) => {
  fetchFlashCardResults()
      .then((results) => {
        var copyDecks = JSON.parse(results);
        var deckId = card.deckId;

        Object.keys(copyDecks).map((deck) => {
          if(copyDecks[deck].id === deckId){
            copyDecks[deck].cards = copyDecks[deck].cards.filter((currentCard) => currentCard.id !== card.id);
          }
        });
        AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(copyDecks));
      })
};

export const editDeckAPI = (deck) => {
  fetchFlashCardResults()
      .then((results) => {
        var decks = JSON.parse(results);
        var copyDeck = {};
        Object.keys(decks).map((currentDeck) => {
          if(decks[currentDeck].id === deck.id){
            copyDeck = {
                ...decks[currentDeck]
            };
            //Update title
            copyDeck.title = deck.title;
            delete decks[currentDeck];
          }
        });
        //Update property name to new title
        decks[deck.title] = copyDeck;

        AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(decks))
      })
};


