import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import {connect} from "react-redux";
import{DECK, CARD} from "../reducers";
import {fetchFlashCardResults} from "../utils/api";
import {addAllCards, addCard, addDeck} from "../actions";
import {lightGray} from "../utils/colors";
import {AppLoading, Font} from "expo";

class DeckListView extends Component{
    state = {
        fontLoaded: false
    };

    static navigationOptions = ({navigation}) => {
        const font = navigation.state.params;
        return {
            headerTitleStyle: {
                fontFamily: font ? font.name : "Arial",
                fontSize: 52,
                textAlign: "center",
            }
        }
    };

    _loadFontsAsync = async () => {
        await Font.loadAsync({"coolvetica-rg": require("../assets/fonts/coolvetica-rg.ttf")});
        await Font.loadAsync({"Arial": require("../assets/fonts/Arial.ttf")});
        this.setState({fontLoaded: true}, () => {
            this.props.navigation.setParams({name: "coolvetica-rg"});
        });
    };

    componentDidMount(){
        //load font
        this._loadFontsAsync();

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
            "Deck", //go to DeckView with single Deck
            {"deckId": id}) //passing deckId as parameter
    };

    render(){
        if (!this.state.fontLoaded) {
            return (
                <AppLoading/>
            );
        }

        const {decks} = this.props;
        return(
            <ScrollView contentContainerstyle={styles.innerContainer}>
                {decks && decks.map((deck) => (
                    <View key={deck.id} style={styles.decks}>
                        <TouchableOpacity onPress={() => this.goToDeck(deck.id)}>
                            <Text style={styles.title}>{deck.title}</Text>
                        </TouchableOpacity>
                        <Text>No of Cards: {deck.noOfCards}</Text>
                    </View>
                ))}
            </ScrollView>
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
    innerContainer: {
        flexGrow: 1,
        backgroundColor: "black",
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: "gray"
    },
    decks: {
        padding: 10,
        backgroundColor: lightGray,
        borderBottomWidth: 1,
        alignItems: "center"
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Arial"
    },
    subtitle: {
        fontFamily: "Arial",
        color: "gray",
    }
});

export default connect(mapStateToProps, dispatchStateToProps) (DeckListView);
