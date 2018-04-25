import React, { Component } from "react";
import { connect } from "react-redux";
import { ART, Dimensions, View } from "react-native";
import { Button }  from './common';
import { Candle } from "./../shapes/Candle";
import { zoomChart, fetchChart } from '../actions';
import CoordsConverter from '../engine/CoordsConverter';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.zoom = 4;
  }

  componentWillMount() {


    console.log("componentWillMount")
    this.props.fetchChart();
  }

  render() {
 
    let maxPrice = Number.MIN_VALUE;
    let minPrice = Number.MAX_VALUE;
    this.props.chart.forEach(candle => {
      if (candle.high > maxPrice) maxPrice = candle.high;
      if (candle.low < minPrice) minPrice = candle.low;
    });

    let offset = (maxPrice - minPrice) / 2;
    maxPrice += offset;
    minPrice -= offset;

    let { height, width } = Dimensions.get("window");
    let candleWidth = width / this.props.chart.length;
    let pixelValue = height / (maxPrice - minPrice);

    let x = 0;
    const screenCandles = this.props.chart.map(candle => {
      const screenCandle = {
        date: candle.date,
        x: x,
        width: candleWidth,
        high: height - (candle.high - minPrice) * pixelValue,
        low: height - (candle.low - minPrice) * pixelValue,
        open: height - (candle.open - minPrice) * pixelValue,
        close: height - (candle.close - minPrice) * pixelValue
      };

      x += candleWidth;
      return screenCandle;
    });

    const candles = screenCandles.map(candle => (
      <Candle key={candle.date} candleData={candle} />
    ));

    return (
      <View style={styles.containerStyle}>
        <Button
          onPress={() => {
            this.props.zoomChart(++this.zoom);
          }}
        >
          Zoom
        </Button>
        <ART.Surface width={width} height={height}>
          <ART.Group x={0} y={0}>
            {candles}
          </ART.Group>
        </ART.Surface>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: '#ddd',
    position: 'relative'
  }
};

const mapStateToProps = state => {
  return { chart: state.chart };
};

export default connect(mapStateToProps, {
  zoomChart, fetchChart
})(Chart);
