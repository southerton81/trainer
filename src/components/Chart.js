import React, { Component } from "react";
import { connect } from "react-redux";
import { ART, Dimensions, View, ActivityIndicator } from "react-native";
import { Button } from "./common";
import { Candle } from "./../shapes/Candle";
import { zoomChart, fetchChart } from "../actions";
import CoordsConverter from "../engine/CoordsConverter";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.zoom = 4;
  }

  componentWillMount() {
    this.props.fetchChart();
  }

  render() {
    if (this.props.coordsConverter !== null) {
      let { height, width } = Dimensions.get("window");

      console.log(height)
      console.log(width)
      this.props.coordsConverter.setScreenSize(width, height);
      let screenCandles = this.props.coordsConverter.getScreenCandles(0, 292);

      const candles = screenCandles.map(candle => (
        <Candle key={candle.date} candleData={candle} />
      ));

/*
      <Button
            onPress={() => {
              this.props.zoomChart(++this.zoom);
            }}
          >
            Zoom
          </Button>
*/

      return (
        <View style={styles.containerStyle}>
          <ART.Surface width={width} height={height}>
            <ART.Group x={0} y={0}>
              {candles}
            </ART.Group>
          </ART.Surface>
        </View>
      );
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
    backgroundColor: "#123",
    justifyContent: "flex-start",
    flexDirection: "column",
    borderColor: "#ddd",
    position: "relative"
  }
};

const mapStateToProps = state => {
  return { coordsConverter: state.coordsConverter };
};

export default connect(mapStateToProps, {
  zoomChart,
  fetchChart
})(Chart);
