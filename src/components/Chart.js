import React, { Component } from "react";
import { connect } from "react-redux";
import { ART, Dimensions, View, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { Button } from "./common";
import { Candle } from "./../shapes/Candle";
import { Trendlines } from "./../shapes/Trendlines";
import { zoomChart, fetchChart, addTrendline } from "../actions"; 

class Chart extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchChart()
  }

  onTouch(event) {
    this.props.addTrendline(
      event.nativeEvent.locationX,
      event.nativeEvent.locationY
    )
  }

  render() {
    console.log("1")
    if (this.props.loading)
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>)

    const candles = this.props.candles.map(candle => (<Candle key={"candle" + candle.date} candleData={candle} />))
    const trendlines = <Trendlines trendlines={this.props.trendlines} />

    let { height, width } = Dimensions.get("window")
    return (
      <TouchableWithoutFeedback onPress={this.onTouch.bind(this)}>
        <View style={styles.containerStyle}>
          <ART.Surface width={width} height={height}>
            {candles}
            {trendlines}
          </ART.Surface>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  containerStyle: {
    flex:1,
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#aaa",
    justifyContent: "flex-start",
    flexDirection: "column",
    borderColor: "#ddd",
    position: "relative"
  }
}

const mapStateToProps = state => { 
  return { candles: state.chartState.candles,
           trendlines: state.chartState.trendlines,
           loading: state.chartState.loading,
           span: state.chartState.span }
}

export default connect(mapStateToProps, {
  zoomChart,
  fetchChart,
  addTrendline
})(Chart)
