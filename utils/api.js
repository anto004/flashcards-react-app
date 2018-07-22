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

export const saveDeckTitle = (id, title) => {
    const deck = {
        [title]: {
            "id": id,
            "title": title,
            "cards": []
        }};

    return AsyncStorage.mergeItem(FLASHCARD_KEY, JSON.stringify(deck),
        () => {
                AsyncStorage.getItem(FLASHCARD_KEY, (err, results) => {
                    console.log("saveDeckTile merge results", results)
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
            return AsyncStorage.mergeItem(FLASHCARD_KEY, JSON.stringify(decks),
                () => {
                    AsyncStorage.getItem(FLASHCARD_KEY, (err, results) => {
                        console.log("saveDeckTile merge results", results)
                    })
                });
        });
};

export function removeAllFlashCards() {
    return AsyncStorage.removeItem(FLASHCARD_KEY)
        .then((results) => {
            console.log("Removed all flashcards", results)
        })
};



