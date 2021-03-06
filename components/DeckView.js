import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import {connect} from "react-redux";
import {DECK, CARD} from "../reducers";
import {deleteDeck, editDeckTitle} from "../actions";
import FlashcardsButton from "./FlashcardsButton";
import {black, white, greenBlack} from "../utils/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {clearLocalNotification, setLocalNotification} from "../utils/helpers";
import {AppLoading} from 'expo';
import {deleteDeckAPI, editDeckAPI} from "../utils/api";

class DeckView extends Component {

  state = {
    isReady: true,
    changeToInput: false,
    inputValue: "",
  };
  //Programmatically adding title to header
  static navigationOptions = ({navigation}) => {
    const {title: titleValue} = navigation.state.params;
    return {
      title: titleValue ? titleValue : "",
      headerTitleStyle: {
        fontFamily: "coolvetica-rg",
        fontSize: 30,
        fontWeight: "bold",
        color: greenBlack,
      }
    }
  };

  componentDidMount() {
    const {deck} = this.props;
    this.props.navigation.setParams({title: deck.title})
  }

  addCard = (deckId) => {
    const {deck} = this.props;
    this.props.navigation.navigate(
        "AddCard",
        {
          "deckId": deckId,
          "title": deck.title,
        }
    )
  };

  goToQuiz = (deckId) => {
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

  deleteDeck = (deck) => {
    this.setState({
      isReady: false
    });
    // from redux
    this.props.boundDeleteDeck(deck);
    // from database
    deleteDeckAPI(deck);
    //go back to DeckListView
    this.props.navigation.goBack();
  };

  goToCardListView = (deckId) => {
    const {navigation} = this.props;
    navigation.navigate(
        "CardList",
        {
          title: "Cards",
          deckId
        });
  };

  editTitle = (title) => {
    this.setState({
      inputValue: title,
      changeToInput: true,
    })
  };

  handleChangeText = (text) => {
    this.setState({
      inputValue: text
    })
  };

  submitText = (deck) => {
    this.setState({
      changeToInput: false
    });
    //Set new input text value as new deck title
    deck.title = this.state.inputValue;
    //Edit To Redux
    this.props.boundEditDeckTitle(deck);
    //Edit to AsyncStorage
    editDeckAPI(deck);
  };

  render() {
    const {deck, cards} = this.props;
    const {isReady, changeToInput, inputValue} = this.state;
    const noOfCards = cards.length;

    if(!isReady){
      return <AppLoading/>
    }

    return (
        <View style={styles.outerContainer}>
          <TouchableOpacity onPress={() => this.deleteDeck(deck)}>
            <MaterialCommunityIcons style={styles.delete} name={"minus-circle-outline"} size={32} color={black}/>
          </TouchableOpacity>
          <View style={styles.innerContainer}>
            <View style={styles.decks}>

              <View style={styles.center}>
                {changeToInput &&
                  <TextInput
                      style={styles.editTitle}
                      underLineColorAndroid='transparent'
                      value={inputValue}
                      onChangeText={(text) => this.handleChangeText(text)}
                      maxLength={130}
                      onSubmitEditing={() => this.submitText(deck)}/>
                }
                {!changeToInput &&
                  <TouchableOpacity
                      onLongPress={() => this.editTitle(deck.title)}>
                    <Text style={styles.title}>{deck.title}</Text>
                  </TouchableOpacity>
                }

                <TouchableOpacity
                    style={styles.cardsButton}
                    onPress={() => this.goToCardListView(deck.id)}>
                  <View style={styles.center}>
                    <Text style={styles.cardsNumber}>
                      Cards: {noOfCards}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>


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
  return {
    deck: state[DECK].filter((deck) => deck.id === deckId)[0],
    cards: state[CARD].filter((card) => card.deckId === deckId)
  }
}

function dispatchStateToProps(dispatch) {
  return {
    boundDeleteDeck: (deck) => dispatch(deleteDeck(deck)),
    boundEditDeckTitle: (deck) => dispatch(editDeckTitle(deck))
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
    marginTop: 75,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Arial",
    textAlign: "center",
  },
  editTitle: {
    fontFamily: "Arial",
    textAlign: "center",
    height: 30,
    width: 100,
  },
  cardsNumber: {
    fontFamily: "Arial",
    color: "gray",
    textAlign: "center",
  },
  delete: {
    alignSelf: "flex-end",
    margin: 10
  },
  cardsButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 25,
    borderRadius: 3,
    borderWidth: 1,
    marginTop: 10,
    borderColor: black,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  }
});

export default connect(mapStateToProps, dispatchStateToProps)(DeckView);
