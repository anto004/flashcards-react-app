import React, {Component} from "react";
import {View, Text}from "react-native";
import {connect}from "react-redux";
import {CARD} from "../reducers";

class CardListView extends Component{
  render(){
    const {cards} = this.props;
    return(
        <View>
          <Text>Cards:</Text>
          {cards.map((card) => (
              <View key={card.id}>
                <Text>{JSON.stringify(card.question)}</Text>
                <Text>{JSON.stringify(card.answer)}</Text>
              </View>
          ))}
        </View>
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

export default connect(mapStateToProps, dispatchStateToProps) (CardListView);