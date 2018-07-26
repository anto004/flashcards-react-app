import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import {connect} from "react-redux";
import {addCard, addDeck, addAllCards} from "../actions";
import {saveCard} from "../utils/api"
import {black, white} from "../utils/colors";
import FlashcardsButton from "./FlashcardsButton";


class NewCard extends Component{
    state = {
        question: "",
        answer: ""
    };

    static navigationOptions = ({navigation}) => {
        const {title: titleValue}= navigation.state.params;
        return {
            title: titleValue ? titleValue : "",
            headerTitleStyle: {
                fontSize: 30,
                fontWeight: "bold"
            }
        }
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
        const newCard = this.createNewCard(deckId);
        //save to redux
        this.props.boundAddCard(newCard);

        //save to database
        saveCard(deckId, newCard);

        this.props.navigation.goBack();

    };
    render(){
        const {deckId} = this.props;
        return(
            <View style={styles.outerContainer}>
                <Text style={styles.title}>Enter Question and Answer</Text>
                <View style={styles.innerContainer}>
                    <TextInput style={styles.text}
                               placeholder={"question"}
                               onChangeText={(question) => this.setState({question})}
                    >
                    </TextInput>
                    <TextInput style={styles.text}
                               placeholder={"answer"}
                               onChangeText={(answer) => this.setState({answer})}
                    >
                    </TextInput>
                    <FlashcardsButton style={{backgroundColor: black}}
                                      onPress={() => this.submit(deckId)}
                                      disabled={!this.state.question || !this.state.answer}>
                        <Text>Submit</Text>
                    </FlashcardsButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: white,
        borderWidth: 1,
        borderColor: "gray",
        padding: 22
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: white,
        margin: 5,
    },
    title: {
        paddingTop: 50,
        fontSize: 32,
        fontWeight: "bold",
    },
    text: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: black,
        textDecorationLine: "underline",
        width: 200,
        height: 60,
        padding: 18,
        fontSize: 18,
    }
});

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