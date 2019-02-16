import React, {Component} from "react";
import {ScrollView, StyleSheet, View, Text}from "react-native";
import {connect}from "react-redux";
import {CARD} from "../reducers";
import {black, lightGray, white} from "../utils/colors";

class CardListView extends Component{
  render(){
    const {cards} = this.props;
    return(
        <ScrollView contentContainerStyle={styles.outerContainer}>
          {cards.map((card) => (
              <View key={card.id} style={styles.card}>
                <Text style={styles.QAText}>Q: {card.question}</Text>
                <Text style={styles.QAText}>A: {card.answer}</Text>
              </View>
          ))}
        </ScrollView>
    )
  }
}

function mapStateToProps(state, props){
  const deckId = props.navigation.state.params;
  return {
    cards: state[CARD].filter((card) => card.deckId === deckId)
  }
}

function dispatchStateToProps(dispatch){
  return {
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: lightGray,
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingTop: 6,
    paddingRight: 10,
    paddingBottom: 6,
  },
  QAText: {
    fontFamily: "Arial",
    fontWeight: "bold",
  }
});

export default connect(mapStateToProps, dispatchStateToProps) (CardListView);