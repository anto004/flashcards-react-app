import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {addDeck} from "../actions";
import {saveDeck} from "../utils/api"
import {black, white} from "../utils/colors";
import FlashcardsButton from "./FlashcardsButton";


class NewDeck extends Component{
    state = {
        title: ""
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
        saveDeck(newDeck.id, newDeck.title)
    };
    render(){
        return(
            <View style={styles.outerContainer}>
                <Text style={styles.title}>Enter New Deck Title</Text>
                <View style={styles.innerContainer}>
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
   },
    title: {
        paddingTop: 50,
        fontSize: 32,
        fontWeight: "bold",
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