import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {connect} from "react-redux";
import{DECK, CARD} from "../reducers";

class DeckView extends Component{

    render(){
        const {deck, cards} = this.props;
        console.log("Cards", cards);
        return(
            <View style={styles.container}>
                <Text>{deck.title}</Text>
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
});

export default connect(mapStateToProps, dispatchStateToProps) (DeckView);
