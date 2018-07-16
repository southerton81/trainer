import React, { Component } from "react";
import { connect } from "react-redux";
import { Animated, PanResponder, ART, Dimensions, View, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { Button } from "./common";
import { Candle } from "./../shapes/Candle";
import { Trendlines } from "./../shapes/Trendlines";
import { zoomChart, fetchChart, addTrendline,  moveChart } from "../actions"; 

class Chart extends Component {
  constructor(props) {
    super(props) 
  }

  componentWillMount() { 
    this.props.fetchChart()

    this.pan = {x: 0, y: 0};
  
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder:(evt, gestureState) => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
  
      onPanResponderGrant: (e, gestureState) => {
        this.pan = {x: e.nativeEvent.locationX, y: e.nativeEvent.locationY}

        //console.log('gr: ' + this.pan.x + ' ' + this.pan.y)
      },
  
      onPanResponderMove: (e, gestureState) => { 

        let xDiff = e.nativeEvent.locationX - this.pan.x

        this.pan = {x: e.nativeEvent.locationX, y: e.nativeEvent.locationY}

        //console.log('mov: ' + this.pan.x + ' ' + this.pan.y) 
        this.props.moveChart(xDiff)
        //console.log('xDiff: ' + xDiff)
      //  console.log('touches: ' + e.nativeEvent.touches + ' ' + e.y)
      },
  
      onPanResponderRelease: (e, {vx, vy}) => {
      }
    });
  }
  
  onTouch(event) {
    this.props.addTrendline(
      event.nativeEvent.locationX,
      event.nativeEvent.locationY
    )
  }
  
  render() { 
    if (this.props.loading)
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>)

    const candles = this.props.candles.map(candle => (<Candle key={"candle" + candle.date} candleData={candle} />))
    const trendlines = <Trendlines trendlines={this.props.trendlines} />

    let { height, width } = Dimensions.get("window")
    return ( 
        <View style={styles.containerStyle} {...this._panResponder.panHandlers}>
          <ART.Surface width={width} height={height}>
            {candles}
            {trendlines}
          </ART.Surface>
        </View> 
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
  addTrendline,
  moveChart
})(Chart)
