import React from 'react';
import {View, Text, StatusBar, Platform, TouchableOpacity, AsyncStorage, ScrollView} from 'react-native';
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducers/index";
import {logger} from "redux-logger";
import DeckListView from "./components/DeckListView";
import {Constants} from "expo";
import {black, darkGreen, lightGray, lightYellow, white} from "./utils/colors";
import {createStackNavigator} from "react-navigation";
import QuizView from "./components/QuizView";
import NewCard from "./components/NewCard";
import DeckView from "./components/DeckView";
import {MaterialIcons} from "@expo/vector-icons";
import NewDeck from "./components/NewDeck";
import {setLocalNotification} from "./utils/helpers";

/*
Credits: font by http://www.typodermicfonts.com/
*/

// To add Redux dev tools to applyMiddleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(logger)
    )
);

const FlashcardStatusBar = ({backgroundColor, ...props}) => {
    return(
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent
                       backgroundColor={backgroundColor}
                       {...props}/>
        </View>
    )
};

const GoToNewDeck =  ({navigate}) => {
    return(
        <View>
            <TouchableOpacity onPress={() => navigate("AddDeck")}>
                <MaterialIcons
                    name={"add-circle-outline"}
                    size={32}
                    color={black}
                />
            </TouchableOpacity>
        </View>
    )
};

const MainNavigator = createStackNavigator({
    Decks: {
        screen: DeckListView,
        navigationOptions: ({navigation}) => ({
            title: "Decks",
            headerTitleStyle: {
                position: "absolute",
                top: 0,
                fontSize: 35
            },
            headerRight: <GoToNewDeck navigate={navigation.navigate}/>
        })
    },
    Deck: {
        screen: DeckView,
    },
    AddDeck: {
        screen: NewDeck
    },
    AddCard: {
        screen: NewCard
    },
    Quiz: {
        screen: QuizView
    }
});


export default class App extends React.Component {

    componentDidMount(){
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={store}>
                <View style={[{flex: 1}, {backgroundColor: "black"}]}>
                    <FlashcardStatusBar backgroundColor={darkGreen} barStyle="light-content"/>
                    <MainNavigator/>
                </View>
            </Provider>
        );
    }
}
