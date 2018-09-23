import React, { Component } from "react"
import { connect } from "react-redux"
import {
  Animated,
  PanResponder,
  ART,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Text
} from "react-native"
import { Button } from "./common"
import { Candle } from "./../shapes/Candle"
import { Trendlines } from "./../shapes/Trendlines"
import { Selected } from "./../shapes/Selected"
import { Rectangle } from "./../shapes/Rectangle"
import { zoomChart, moveChart, select, fetchVolume } from "../actions"

class VolumeChart extends Component {
  constructor(props) {
    super(props)
    this.state = { dimensions: { width: 0, height: 0 } }
  }

  onLayout = e => {
    console.log("VolumeChart onLayout")

    if (!this.state.dimensions || 
      this.state.dimensions.width !== e.nativeEvent.layout.width || 
      this.state.dimensions.height !== e.nativeEvent.layout.height) {
      this.setState({ dimensions: e.nativeEvent.layout })
    }
  }

  componentWillMount() {}

  render() {
    if (this.state.dimensions.height == 0 ||
      !this.props.candles || this.props.candles.length == 0) {
      return (
        <View style={{ flex: 1 }} onLayout={this.onLayout}>
        </View>
      )
    }

    let { height, width } = this.state.dimensions

    let maxVolume = this.props.candles.reduce((max, c) => c.volume > max ? c.volume : max, this.props.candles[0].volume)
    let screenRatio = maxVolume / height
    let volumeBarWidth = width / this.props.candles.length
    const volumes = this.props.candles.map((candle, index) => (
      <Rectangle key={"volume" + candle.date}
        x={index * volumeBarWidth} y={height}
        width={volumeBarWidth} height={candle.volume / screenRatio}
        colorBody="#000" colorOutline="#EEE" />
    ))

    return (
      <View style={{ flex: 1 }}>
        <ART.Surface width={width} height={height}>
          {volumes}
        </ART.Surface>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    candles: state.chartState.candles,
    selected: state.chartState.selected
  }
}

export default connect(
  mapStateToProps,
  {
    select 
  }
)(VolumeChart)
