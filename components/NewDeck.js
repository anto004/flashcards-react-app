import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, AsyncStorage} from "react-native";
import {TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {addCard, addDeck} from "../actions";
import {fetchFlashCardResults, FLASHCARD_KEY, removeAllFlashCards} from "../utils/api";
import {saveDeckTitle} from "../utils/api"

//TODO Create component for Card
//Save title to redux
//Save card to redux
//From card save to AsyncStorage
//Card on a separate component and pass deck id as parameter to card component
//TODO Create a Text Button
class NewDeck extends Component{
    state = {
        title: "",
        question: "",
        answer: ""
    };

    componentDidMount(){
        //fetching data from database and saving to redux
        fetchFlashCardResults()
            .then((results) => {
                const decks = JSON.parse(results);
                Object.keys(decks).map((deck) => {
                    const deckEntry = {"id": decks[deck].id, "title": decks[deck].title};
                    const cards = decks[deck].cards; // returns an array of cards
                    this.props.boundAddDeck(deckEntry);
                });
            })
    }

    createNewCard = (deckId) =>{
        const uuid = require("uuid/v4");
        const id = uuid();
        return {
            "id": id,
            "deck": deckId,
            "question": this.state.question,
            "answer": this.state.answer
        }
    };

    createNewDeck = () => {
        const uuid = require("uuid/v4");
        const id = uuid();
        return {
            "id": id,
            "title": this.state.title
        }
    };
    submit = () =>{
        const newDeck = this.createNewDeck();
        const newCard = this.createNewCard(newDeck.id);
        console.log("newDeck", newDeck);
        console.log("newCard", newCard);
        //save to Redux
        this.props.boundAddDeck(newDeck);
        this.props.boundAddCard(newCard);

        //Save to AsyncStorage
        saveDeckTitle(newDeck.id, newDeck.title);


    };
    render(){
        return(
            <View>
                <TextInput placeholder={"Enter Title"}
                           onChangeText={(title) => this.setState({title})}
                >
                </TextInput>
                <TextInput placeholder={"Enter Question"}
                           onChangeText={(question) => this.setState({question})}
                >
                </TextInput>
                <TextInput placeholder={"Enter Answer"}
                           onChangeText={(answer) => this.setState({answer})}
                >
                </TextInput>

                <TouchableOpacity onPress={this.submit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return{
        boundAddDeck: (deck) => dispatch(addDeck(deck)),
        boundAddCard: (card) => dispatch(addCard(card))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)