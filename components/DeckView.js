import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import{DECK, CARD} from "../reducers";
import FlashcardsButton from "./FlashcardsButton";
import {black, white} from "../utils/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {clearLocalNotification, setLocalNotification} from "../utils/helpers";

class DeckView extends Component{

    //Programmatically adding title to header
    static navigationOptions = ({navigation}) => {
        const {title: titleValue}= navigation.state.params;
        return {
            title: titleValue ? titleValue : "",
            headerTitleStyle: {
                fontFamily: "coolvetica-rg",
                fontSize: 30,
                fontWeight: "bold"
            }
        }
    };
    componentDidMount(){
        const {deck} = this.props;
        this.props.navigation.setParams({title: deck.title})
    }

    addCard = (deckId) =>{
        const {deck} = this.props;
        this.props.navigation.navigate(
            "AddCard",
            {
                "deckId": deckId,
                "title": deck.title,
            }
        )
    };

    goToQuiz = (deckId) =>{
        const {deck} = this.props;
        this.props.navigation.navigate(
            "Quiz",
            {
                "deckId": deckId,
                "title": deck.title,
            }
        );

        clearLocalNotification()
            .then(setLocalNotification)
    };

    deleteCard = (id) => {
        //TODO: delete card
        // from redux
        // from asyncstorage
    };

    deleteDeck = (id) => {
        //TODO: delete deck
        // from redux
        // from asyncstorage
    };

    render(){
        const {deck, cards} = this.props;
        const noOfCards = cards.length;
        return(
            <View style={styles.outerContainer}>
                <TouchableOpacity onPress={() => this.deleteDeck(deck.id)}>
                    <MaterialCommunityIcons style={styles.delete} name={"minus-circle-outline"} size={32} color={black}/>
                </TouchableOpacity>
                <View style={styles.innerContainer}>
                    <View style={[styles.decks]}>
                        <Text style={styles.title}>{deck.title}</Text>
                        <Text style={styles.subtitle}>Cards: {noOfCards}</Text>
                    </View>

                    <View style={styles.buttonsContainerCenter}>
                        <FlashcardsButton style={{backgroundColor: white}}
                                          onPress={() => this.addCard(deck.id)}>
                          <Text>Add Card</Text>
                        </FlashcardsButton>
                        <FlashcardsButton style={{backgroundColor: black}}
                                          onPress={() => this.goToQuiz(deck.id)}
                                          disabled={!(noOfCards > 0)}>
                          <Text>Start Quiz</Text>
                        </FlashcardsButton>
                    </View>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state, {navigation}) {
    const {deckId} = navigation.state.params;
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
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "gray"
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonsContainerCenter: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    decks: {
        flex: 1,
        marginTop: 100,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Arial",
    },
    subtitle: {
        fontFamily: "Arial",
        color: "gray",
        textAlign: "center",
    },
    delete: {
        alignSelf: "flex-end",
        margin: 10
    }
});

export default connect(mapStateToProps, dispatchStateToProps) (DeckView);
