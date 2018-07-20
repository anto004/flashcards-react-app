import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {connect} from "react-redux";
import{DECK, CARD} from "../reducers";

class DeckView extends Component{

    render(){
        const {deck} = this.props;
        return(
            <View style={styles.container}>
                {deck &&
                    <View>
                        <Text>{deck.title}</Text>
                    </View>
                }
            </View>
        )
    }
}

function mapStateToProps(state, {navigation}) {
    const {deckId} = navigation.state.params;
    console.log("deckId", deckId);
    return{
        decks: state[DECK]
    }
}

function dispatchStateToProps(dispatch) {
    return{
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect(mapStateToProps, dispatchStateToProps) (DeckView);
