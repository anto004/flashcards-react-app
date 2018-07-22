import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    PanResponder
} from "react-native";
import {connect} from "react-redux";
import{DECK, CARD} from "../reducers";
import FlashcardsButton from "./FlashcardsButton";
import {black, lightYellow, white} from "../utils/colors";


class QuizView extends Component{

    state = {
        index: 0
    };

    flashcardPos = new Animated.Value(0);
    screenWidth = Dimensions.get("window").width;

    flashcardPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
            this.flashcardPos.setValue(gesture.dx);
        },
        onPanResponderRelease: (event, gesture) => {
            if(Math.abs(gesture.dx) > this.screenWidth * 0.4){ //release view if swiped > 40%
                const direction = Math.sign(gesture.dx);
                Animated.timing(
                    this.flashcardPos,
                    {
                        toValue: direction * this.screenWidth, //animate towards left screen or right screen
                        duration: 250
                    }
                ).start(() => this.handleSwipe(-1 * direction)) //next card should come from opp direction
            }
            else {
                //Reset to starting position if swiped less than 40%
                Animated.spring(
                    this.flashcardPos,
                    {
                        toValue: 0,
                        duration: 250
                    }
                ).start()
            }
        }
    });

    handleSwipe = (indexDirection) => {
        const {cards} = this.props;
        const nextIndex = this.state.index + indexDirection;

        if (nextIndex >= cards.length || nextIndex <= 0) {
            Animated.spring(
                this.flashcardPos,
                {
                    toValue: 0,
                }
            ).start();
            return;
        }

        this.setState((prevState) => ({
            index: nextIndex //if swiped left decrement index, swiped right increment index
        }));
        this.flashcardPos.setValue(indexDirection * this.screenWidth);
        Animated.spring(
            this.flashcardPos,
            {
                toValue: 0, //animate from edge to 0
                duration: 250
            }
        ).start();
    };
    render(){
        const {cards} = this.props;
        return(
            <View style={styles.container}>
                <Text style={{color: white}}>Quiz View</Text>
                <Animated.View
                    {...this.flashcardPanResponder.panHandlers}
                    style={[{left: this.flashcardPos}, styles.flashcard]}>
                    <Text style={styles.flashcardText}>
                        {cards[this.state.index].question}
                    </Text>
                </Animated.View>
            </View>
        )
    }
}

function mapStateToProps(state, {navigation}) {
    const deckId =  navigation.state.params.deckId;
    return{
        deckId: deckId,
        cards: state[CARD].filter((card) => card.deckId === deckId)
    }
}

function dispatchStateToProps(dispatch) {
    return{
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flashcard: {
        //TODO: Add shadow effect
        justifyContent: "center",
        alignItems: "center",
        margin: 15,
        padding: 15,
        width: 300,
        height: 200,
        borderRadius: 3,
        backgroundColor: lightYellow,
    },
    flashcardText: {
        fontFamily: "Arial",
        fontSize: 24,
    }
});

export default connect(mapStateToProps, dispatchStateToProps) (QuizView);
