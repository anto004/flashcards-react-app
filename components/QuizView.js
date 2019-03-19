import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    PanResponder, TouchableOpacity
} from "react-native";
import {connect} from "react-redux";
import{CARD} from "../reducers";
import FlashcardsButton from "./FlashcardsButton";
import {black, darkGray, green, lightYellow, red, white} from "../utils/colors";
import Modal from "react-native-modal";
import {Ionicons} from "@expo/vector-icons";


class QuizView extends Component{

    state = {
        index: 0,
        value: 0,
        correctCount: 0,
        visibleModal: false,
    };

    constructor(props){
        super(props);
        this.flashcardPos = new Animated.Value(0);
        this.animatedValue = new Animated.Value(0);
        this.animatedValue.addListener(({value}) => this.setState({value}));
        this.screenWidth = Dimensions.get("window").width;
    }

    static navigationOptions = ({navigation}) => {
        const {title: titleValue}= navigation.state.params;
        return {
            title: titleValue ? titleValue : "",
            headerTitleStyle: {
                fontSize: 30,
                fontWeight: "bold"
            }
        }
    };

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
            outputRange: ["180deg","135deg", "90deg", "45deg", "0deg", "45deg", "90deg", "135deg"]
        });
       return {
           transform: [
               {rotateY: setInterpolateBack}
           ]
       }
    };

    correctHandle = (cardsSoFar, totalCards) => {
        this.setState((prevState) => ({
            correctCount: prevState.correctCount + 1}));

        if(cardsSoFar >= totalCards){
            this.setState({visibleModal: true});
            return;
        }

        this.setState((prevState) => ({
            index: prevState.index + 1}));
    };

    incorrectHandle = (cardsSoFar, totalCards) => {
        if(cardsSoFar >= totalCards){
            this.setState({visibleModal: true});
            return;
        }

        this.setState((prevState) => ({
            index: prevState.index + 1}));
    };

    percentageCalculation = (totalCards) => {
        const percentage = Math.ceil((this.state.correctCount / totalCards) * 100);
        return percentage >= 50 ? `You scored ${percentage}% 👍` : `You scored ${percentage}%📚`;
    };

    closeModal = () => {
        this.setState({visibleModal: false});
        this.props.navigation.navigate("Deck");
    };

    render(){
        const {cards} = this.props;
        const totalCards = cards.length;
        this.percentageCalculation(totalCards);
        if(this.state.visibleModal){
        }
        return(
            <View style={[styles.outerContainer]} >
                <Text style={styles.cardsCount}>{`${this.state.index + 1}/${totalCards}`}</Text>
                <Text style={styles.title}>Quiz</Text>
                <View style={styles.innerContainer}>
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
                    <FlashcardsButton style={{backgroundColor: green}}
                                      onPress={() => this.correctHandle(this.state.index + 1, totalCards)}>
                        <Text>Correct</Text>
                    </FlashcardsButton>
                    <FlashcardsButton style={{backgroundColor: red}}
                                      onPress={() => this.incorrectHandle(this.state.index + 1, totalCards)}>
                        <Text>Incorrect</Text>
                    </FlashcardsButton>
                </View>

                <Modal visible={this.state.visibleModal}
                       animationType="fade"
                       transparent={false}
                       onRequestClose={this.closeModal}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={{alignSelf: "flex-end"}}
                                          onPress={() => this.closeModal()}>
                            <Ionicons name={"md-close-circle"} size={30}/>
                        </TouchableOpacity>
                        <Text style={{fontSize: 22}}>{this.percentageCalculation(totalCards)}</Text>
                    </View>
                </Modal>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: darkGray,
        borderWidth: 1,
        borderColor: "gray"
    },
    innerContainer: {
        flex: 1,
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
        borderRadius: 4,
        backgroundColor: lightYellow,
    },
    flashcardText: {
        fontFamily: "Arial",
        fontSize: 24,
    },
    cardsCount: {
        alignSelf: "flex-start",
        margin: 10,
        fontSize: 18,
        color: black,
    },
    modalContent: {
        justifyContent: "center",
        alignItems: "center",
        padding: 22,
        paddingBottom: 22,
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    title: {
        alignSelf: "center",
        fontSize: 30,
        fontWeight: "bold",
    },
});

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

export default connect(mapStateToProps, dispatchStateToProps) (QuizView);
