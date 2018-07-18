import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducers/index";
import {logger} from "redux-logger";
import Category from "./components/Category";
import NewDeck from "./components/NewDeck";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  // To add Redux dev tools to applyMiddleware
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(logger)
    )
);

export default class App extends React.Component {
  render() {
      console.log("TEST Debugger");
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Category/>
            </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
