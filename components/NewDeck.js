import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {addCard, addDeck} from "../actions";

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
        this.props.boundAddDeck(newDeck);
        this.props.boundAddCard(newCard);
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

    }
}

function mapDispatchToProps(dispatch) {
    return{
        boundAddDeck: (deck) => dispatch(addDeck(deck)),
        boundAddCard: (card) => dispatch(addCard(card))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)