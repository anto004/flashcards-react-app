import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, AsyncStorage} from "react-native";
import {TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {addCard, addDeck, addAllCards} from "../actions";
import {fetchFlashCardResults, FLASHCARD_KEY, removeAllFlashCards} from "../utils/api";
import {saveDeckTitle, saveCard} from "../utils/api"
import DeckListView from "./DeckListView";


class NewCard extends Component{
    state = {
        question: "",
        answer: ""
    };

    createNewCard = (deckId) =>{
        const uuid = require("uuid/v4");
        const id = uuid();
        return {
            "id": id,
            "deckId": deckId,
            "question": this.state.question,
            "answer": this.state.answer
        }
    };

    submit = (deckId) =>{
        //save to redux
        this.props.boundAddCard(this.createNewCard(deckId));

        //TODO: Save to AsyncStorage
        // saveDeckTitle(newDeck.id, newDeck.title)
        //     .then(saveCard(newCard));

    };
    render(){
        const {deckId} = this.props;
        return(
            <View>

                <TextInput placeholder={"Enter Question"}
                           onChangeText={(question) => this.setState({question})}
                >
                </TextInput>
                <TextInput placeholder={"Enter Answer"}
                           onChangeText={(answer) => this.setState({answer})}
                >
                </TextInput>

                <TouchableOpacity onPress={() => this.submit(deckId)}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


function mapStateToProps(state, {navigation}) {
    return {
        deckId: navigation.state.params.deckId
    }
}

function mapDispatchToProps(dispatch) {
    return{
        boundAddDeck: (deck) => dispatch(addDeck(deck)),
        boundAddCard: (card) => dispatch(addCard(card)),
        boundAddAllCards: (cards) => dispatch(addAllCards(cards))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)