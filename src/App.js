import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import Chart from "./components/Chart";

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style = {styles.container} >
          <View style={{ height: 30 }} />
          <Chart />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#aaa"
  }
});
