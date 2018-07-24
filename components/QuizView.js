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
        index: 0,
        value: 0
    };

    constructor(props){
        super(props)
        this.flashcardPos = new Animated.Value(0);
        //TODO replace flashcardPos with animatedValue
        this.animatedValue = new Animated.Value(0);
        this.animatedValue.addListener(({value}) => this.setState({value}));
        this.screenWidth = Dimensions.get("window").width;
    }

    flashcardPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onPanResponderMove: (event, gesture) => {
            this.flashcardPos.setValue(gesture.dx);
        },

        onPanResponderRelease: (event, gesture) => {
            //flip card if user didn't move the card on touched
            if(gesture.dx === 0 && gesture.dy === 0){
                this.flipCardAnimation();
                return;
            }

            //release view if swiped > 40%
            if(Math.abs(gesture.dx) > this.screenWidth * 0.4){
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
            console.log("Released", "x, y", gesture.dx, ", ", gesture.dy);
        }
    });

    handleSwipe = (indexDirection) => {
        const {cards} = this.props;
        const nextIndex = this.state.index + indexDirection;
        if (nextIndex >= cards.length || nextIndex < 0) {
            Animated.spring(
                this.flashcardPos,
                {
                    toValue: 0,
                }
            ).start();
            return;
        }

        this.setState(() => ({
            index: nextIndex
        }));
        //animate from edge to 0
        this.flashcardPos.setValue(indexDirection * this.screenWidth);
        Animated.spring(
            this.flashcardPos,
            {
                toValue: 0,
                duration: 250
            }
        ).start();
    };

    flipCardAnimation = () => {
        if (this.state.value >= 90) {
           this.setState({value: 0}, () => {
               Animated.spring(
                   this.animatedValue,
                   {
                       toValue: 0,
                       tension: 10,
                       friction: 8,
                   }).start(() => {
                   this.setState({value: 0})
               });
           })
        }
        else {
            this.setState({value: 180}, () => {
                Animated.spring(
                    this.animatedValue,
                    {
                        toValue: 180,
                        tension: 10,
                        friction: 8,
                    }).start();
            })
        }
    };

    flipCardFront = () => {
        const setInterpolateFront = this.animatedValue.interpolate({
            inputRange: [0, 45, 90, 180, 225, 270, 315],
            outputRange: ["0deg", "45deg", "90deg", "180deg", "135deg", "90deg", "45deg"]
        });
        return {
            transform: [
                {rotateY: setInterpolateFront}
            ]
        }
    };

    flipCardBack = () => {
        const setInterpolateBack = this.animatedValue.interpolate({
            inputRange: [0, 45, 90, 135, 180, 225, 270, 315],
            outputRange: ["180deg","135deg", "90deg", "45deg", "0deg", "45deg", "900deg", "135deg"]
        });
       return {
           transform: [
               {rotateY: setInterpolateBack}
           ]
       }
    };

    render(){
        const {cards} = this.props;
        return(
            <View style={styles.container}>
                <Text style={{color: white}}>Quiz View</Text>
                {this.state.value >= 0 && this.state.value <= 90
                    ? <Animated.View
                        {...this.flashcardPanResponder.panHandlers}
                        style={[{left: this.flashcardPos}, this.flipCardFront(), styles.flashcard]}>
                        <Text style={styles.flashcardText}>
                            {cards[this.state.index].question}
                        </Text>
                    </Animated.View>
                    : <Animated.View
                        {...this.flashcardPanResponder.panHandlers}
                        style={[{left: this.flashcardPos}, this.flipCardBack(), styles.flashcard]}>
                        <Text style={styles.flashcardText}>
                            {cards[this.state.index].answer}
                        </Text>
                    </Animated.View>
                }
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
