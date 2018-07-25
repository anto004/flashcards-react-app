import React, {Component} from "react";
import {View, Text, TextInput} from "react-native";
import {TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {addDeck} from "../actions";
import {saveDeck} from "../utils/api"


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
            <View>
                <TextInput placeholder={"Enter Title"}
                           onChangeText={(title) => this.setState({title})}
                >
                </TextInput>

                <TouchableOpacity onPress={this.submit} disabled={!this.state.title}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


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