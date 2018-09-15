import React, { Component } from "react"
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import reducers from "./reducers"
import Chart from "./components/Chart"

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers, applyMiddleware(thunk))}>
        <View style = {styles.container}>
          <Chart /> 
          <View style={{flex: 1, backgroundColor: '#E3d'}}/>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
