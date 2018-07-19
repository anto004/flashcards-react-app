import React from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducers/index";
import {logger} from "redux-logger";
import DeckListView from "./components/DeckListView";
import {Constants} from "expo";
import {darkGreen} from "./utils/colors";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  // To add Redux dev tools to applyMiddleware
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
                       {...props}
            />
        </View>
    )
};

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
            <View style={{flex: 1}}>
                <FlashcardStatusBar backgroundColor={darkGreen} barStyle="light-content"/>
                <DeckListView/>
            </View>
        </Provider>
    );
  }
}
