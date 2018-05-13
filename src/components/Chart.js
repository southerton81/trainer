import React, { Component } from "react";
import { connect } from "react-redux";
import { ART, Dimensions, View, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { Button } from "./common";
import { Candle } from "./../shapes/Candle";
import { zoomChart, fetchChart, addTrendline } from "../actions"; 

class Chart extends Component {
  constructor(props) {
    super(props);
    this.zoom = 4;
  }

  componentWillMount() {
    this.props.fetchChart();
  }

  onTouch(event) {

    this.props.addTrendline(0,0,100,200)

    //event.nativeEvent.locationX
    //event.nativeEvent.locationY
  }

  render() {
    if (this.props.coordsConverter !== null) {
      let { height, width } = Dimensions.get("window");

      let screenCandles = this.props.coordsConverter.getScreenCandles(0, 20);

      const candles = screenCandles.map(candle => (
        <Candle key={candle.date} candleData={candle} />
      ));

/*
      <Button
            onPress={() => {
              this.props.zoomChart(++this.zoom);
            }}>
            Zoom
      </Button>
*/

      return (
        <TouchableWithoutFeedback onPress={this.onTouch}>
          <View style={styles.containerStyle}>
            <ART.Surface width={width} height={height}>
              <ART.Group x={0} y={0}>
                {candles}
              </ART.Group>
            </ART.Surface>
          </View>
        </TouchableWithoutFeedback>);
    } else {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
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
};

const mapStateToProps = state => { 

  console.log(state)
  return { coordsConverter: state.chartState.coordsConverter };
};

export default connect(mapStateToProps, {
  zoomChart,
  fetchChart,
  addTrendline
})(Chart);
