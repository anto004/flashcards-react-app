import React, {Component} from "react";
import {ScrollView, StyleSheet, View, Text, TouchableOpacity}from "react-native";
import {connect}from "react-redux";
import {CARD} from "../reducers";
import {black, lightGray, white} from "../utils/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {deleteCard} from "../actions";
import {deleteCardAPI} from "../utils/api";
import {greenBlack} from "../utils/colors";

class CardListView extends Component{

  static navigationOptions({navigation}){
    const {title} = navigation.state.params;
    return{
      title: title ? title : "",
      headerTitleStyle: {
        fontFamily: "coolvetica-rg",
        fontSize: 30,
        fontWeight: "bold",
        color: greenBlack,
      }
    }
  }

  deleteCard = (card) => {
    //delete Card from Redux
    this.props.boundDeleteCard(card);
    //delete Card from AsyncStorage
    deleteCardAPI(card);
  };

  render(){
    const {cards} = this.props;
    const {boundDeleteCard} = this.props;
    return(
        <ScrollView contentContainerStyle={styles.outerContainer}>
          {cards.map((card) => (
              <View key={card.id} style={styles.card}>
                <View style={styles.QAContainer}>
                  <Text style={styles.QAText}>Q: {card.question}</Text>
                  <Text style={styles.QAText}>A: {card.answer}</Text>
                </View>
                <TouchableOpacity style={styles.deleteButton}>
                  <MaterialCommunityIcons
                      name="minus-circle-outline"
                      size={25}
                      onPress={() => this.deleteCard(card)}
                  />
                </TouchableOpacity>
              </View>
          ))}
        </ScrollView>
    )
  }
}


function mapStateToProps(state, props){
  const {deckId} = props.navigation.state.params;
  return {
    cards: state[CARD].filter((card) => card.deckId === deckId)
  }
}

function dispatchStateToProps(dispatch){
  return {
    boundDeleteCard: (card) => dispatch(deleteCard(card))
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "gray",
  },
  card: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: lightGray,
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingTop: 6,
    paddingRight: 10,
    paddingBottom: 6,
  },
  QAContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  QAText: {
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  deleteButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
  }
});

export default connect(mapStateToProps, dispatchStateToProps) (CardListView);