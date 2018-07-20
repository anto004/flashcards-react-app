import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import{DECK, CARD} from "../reducers";
import {fetchFlashCardResults} from "../utils/api";
import {addAllCards, addCard, addDeck} from "../actions";
import NewDeck from "./NewDeck";


class DeckListView extends Component{

    componentDidMount(){
        //fetching data from database and saving to redux
        fetchFlashCardResults()
            .then((results) => {
                if(results){
                    const decks = JSON.parse(results);
                    Object.keys(decks).map((deck) => {
                        const deckEntry = {
                            "id": decks[deck].id,
                            "title": decks[deck].title
                        };
                        this.props.boundAddDeck(deckEntry);

                        const cards = decks[deck].cards; // returns an array of cards
                        if(cards.length > 0){
                            this.props.boundAddAllCards(cards);
                        }
                    });
                }
            })
    }

    goToDeck = (id) => {
        this.props.navigation.navigate(
            "Deck",
            {"deckId": id})
    };

    render(){
        const {decks} = this.props;
        console.log("Decks",decks);
        return(
            <View style={styles.container}>
                {decks && decks.map((deck) => (
                    <View key={deck.id} style={styles.decks}>
                        <TouchableOpacity onPress={() => this.goToDeck(deck.id)}>
                            <Text>{deck.title}</Text>
                        </TouchableOpacity>
                        <Text>No of Cards: {deck.noOfCards}</Text>
                    </View>
                ))}
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    const decksWithCardNo = state[DECK].map((deck) => {
        return {
            ...deck,
            "noOfCards": state[CARD].filter((card) => card.deckId === deck.id).length
        }
    });
    return{
        decks: decksWithCardNo

    }
}

function dispatchStateToProps(dispatch) {
    return{
        boundAddDeck: (deck) => dispatch(addDeck(deck)),
        boundAddCard: (card) => dispatch(addCard(card)),
        boundAddAllCards: (cards) => dispatch(addAllCards(cards))
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    decks: {
        margin: 10
    }
});

export default connect(mapStateToProps, dispatchStateToProps) (DeckListView);
