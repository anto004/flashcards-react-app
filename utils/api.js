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


export function removeAllFlashCards() {
    return AsyncStorage.removeItem(FLASHCARD_KEY)
        .then((results) => {
            console.log("Removed all flashcards", results)
        })
};



