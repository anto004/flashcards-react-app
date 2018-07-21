import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import {connect} from "react-redux";
import{DECK, CARD} from "../reducers";
import FlashcardsButton from "./FlashcardsButton";
import {black, white} from "../utils/colors";


class QuizView extends Component{

    render(){
        const {deckId} = this.props;
        console.log("QuizView deckId", deckId);
        return(
            <View style={styles.container}>
                <Text>Quiz View</Text>
            </View>
        )
    }
}

function mapStateToProps(state, {navigation}) {
    //Get the cards with a specific deckId
    return{
        deckId: navigation.state.params.deckId
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
    }
});

export default connect(mapStateToProps, dispatchStateToProps) (QuizView);
