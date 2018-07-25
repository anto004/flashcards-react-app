import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {black, white} from "../utils/colors";

export default FlashcardsButton = ({children, style, onPress, ...props}) => {
    return (
        <TouchableOpacity style = {[styles.button, style]}
                          onPress = {onPress}
                          {...props}>
            <View style={styles.center}>
                <Text style={[{color: style.backgroundColor === black ? white : black}, styles.text]}>
                    {children}
                </Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        width: 160,
        height: 60,
        borderRadius: 4,
        padding: 15,
        margin: 10,
        borderWidth: 2,
        borderColor: black,

    },
    text: {
        textAlign: "center",
        fontSize: 20,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});