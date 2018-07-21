import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {connect} from "react-redux";
import{DECK, CARD} from "../reducers";
import FlashcardsButton from "./FlashcardsButton";
import {black, white} from "../utils/colors";

class DeckView extends Component{

    render(){
        const {deck, cards} = this.props;
        const noOfCards = cards.length;
        console.log("Cards", cards);
        return(
            <View style={styles.container}>
                <View style={styles.decks}>
                    <Text>{deck.title}</Text>
                    <Text>No of cards: {noOfCards}</Text>
                </View>

                <FlashcardsButton style={{backgroundColor: white}}> Add Card </FlashcardsButton>
                <FlashcardsButton style={{backgroundColor: black}}> Start Quiz </FlashcardsButton>

                {cards.map((card) => (
                    <View key={card.id}>
                        <Text>{card.question}</Text>
                        <Text>{card.answer}</Text>
                    </View>
                ))}
            </View>
        )
    }
}

function mapStateToProps(state, {navigation}) {
    //Get the cards with a specific deckId
    const {deckId} = navigation.state.params;
    console.log("DeckView deckId", deckId);
    return{
        deck: state[DECK].filter((deck) => deck.id === deckId)[0],
        cards: state[CARD].filter((card) => card.deckId === deckId)
    }
}

function dispatchStateToProps(dispatch) {
    return{
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
        marginBottom: 30
    }
});

export default connect(mapStateToProps, dispatchStateToProps) (DeckView);
