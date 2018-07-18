import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import NewDeck from "./NewDeck";

//TODO Create component for Deck
//TODO Create component for Card
class Category extends Component{
    render(){
        return(
            <View>
                <Text>
                    Category!
                </Text>
                <NewDeck/>
            </View>
        );
    }
}

export default Category;