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

    if (this.props.coordsConverter !== null) {
      let pt = this.props.coordsConverter.convertScreenToChart(event.nativeEvent.locationX, event.nativeEvent.locationY)
      this.props.addTrendline(pt.x,pt.y)
    }
  }

  render() {
    if (this.props.coordsConverter !== null) {
      let { height, width } = Dimensions.get("window");

      let screenCandles = this.props.coordsConverter.getScreenCandles(0, 20);

      const candles = screenCandles.map(candle => (
        <Candle key={candle.date} candleData={candle} />
      ));

      let trendlines = []
      if (this.props.trendlines.length > 2) {

          trendlines = this.props.trendlines.reduce((previousValue,currentValue,index) => {
          let pt = this.props.coordsConverter.convertChartToScreen(currentValue.x, currentValue.y)
           
          if (index % 2 === 0) {
            previousValue.push(ART.Path().moveTo(pt.x, pt.y))
          } else {
            let lastPath = previousValue[previousValue.length - 1]
            lastPath = lastPath.lineTo(pt.x, pt.y)
          }

          return previousValue;
        }, []);

        trendlines = trendlines.map((path, index) => (
          <ART.Group key={index}>
            <ART.Shape stroke={"#000"} d={path} />
          </ART.Group>
        ));
      }

      return (
        <TouchableWithoutFeedback onPress={this.onTouch.bind(this)}>
          <View style={styles.containerStyle}>
            <ART.Surface width={width} height={height}>
              <ART.Group x={0} y={0}>
                {candles}
                {trendlines}
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
  return { coordsConverter: state.chartState.coordsConverter,
           trendlines: state.chartState.trendlines };
};

export default connect(mapStateToProps, {
  zoomChart,
  fetchChart,
  addTrendline
})(Chart);
