import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, KeyboardAvoidingView} from "react-native";
import {connect} from "react-redux";
import {addDeck} from "../actions";
import {saveDeck} from "../utils/api"
import {black, white, greenBlack} from "../utils/colors";
import FlashcardsButton from "./FlashcardsButton";


class NewDeck extends Component{
    state = {
        title: ""
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: "Deck",
            headerTitleStyle: {
                fontSize: 30,
                fontWeight: "bold",
                color: greenBlack,
            }
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

        //save to Redux
        this.props.boundAddDeck(newDeck);

        //Save to AsyncStorage
        saveDeck(newDeck.id, newDeck.title);

        this.props.navigation.goBack();
    };
    render(){
        return(
            <View style={styles.outerContainer}>
                <Text style={styles.title}>Enter New Deck Title</Text>
                <KeyboardAvoidingView
                    style={styles.innerContainer}
                    behavior="padding"
                    enabled>
                  <TextInput style={styles.inputText}
                             placeholder={"deck title..."}
                             onChangeText={(title) => this.setState({title})}
                  >
                  </TextInput>
                  <FlashcardsButton style={{backgroundColor:black}}
                                    onPress={this.submit}
                                    disabled={!this.state.title}>
                    <Text>Submit</Text>
                  </FlashcardsButton>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "gray",
        padding: 22
    },
    innerContainer: {
        flex: 3,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
    title: {
        flex: 1,
        paddingTop: 50,
        fontSize: 30,
        fontWeight: "bold",
        backgroundColor: "white"
    },
    inputText: {
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
function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return{
        boundAddDeck: (deck) => dispatch(addDeck(deck)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)