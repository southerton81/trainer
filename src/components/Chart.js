import React, { Component } from "react"
import { connect } from "react-redux"
import {
  Animated,
  PanResponder,
  ART,
  Dimensions,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Text
} from "react-native"
import { Button } from "./common"
import { Candle } from "./../shapes/Candle"
import { Trendlines } from "./../shapes/Trendlines"
import { Selected } from "./../shapes/Selected"
import { zoomChart, fetchChart, addTrendline, moveChart, candleInfo } from "../actions"

class Chart extends Component {
  constructor(props) {
    super(props) 
  } 

  componentWillMount() {
    this.props.fetchChart()
    this.setupPanResponder()
  }

  setupPanResponder() {
    this.pan = { x: 0, y: 0 }
    this.moveDiff = 0
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.pan = { x: e.nativeEvent.locationX, y: e.nativeEvent.locationY }
        this.moveDiff = 0
      },

      onPanResponderMove: (e, gestureState) => {
        let diff = e.nativeEvent.locationX - this.pan.x
        this.pan = { x: e.nativeEvent.locationX, y: e.nativeEvent.locationY }
        if (e.nativeEvent.touches.length <= 1) {
          this.props.moveChart(-diff)
        } else {
          let diff = e.nativeEvent.touches[0].locationX - e.nativeEvent.touches[1].locationX
          if (this.moveDiff > 0) this.props.zoomChart(this.moveDiff - diff)
          this.moveDiff = diff
        }
      },

      onPanResponderRelease: (e, { vx, vy }) => {
        this.props.candleInfo(e.nativeEvent.locationX) 
      }
    })
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
        </View>
      )

    let { height, width } = Dimensions.get("window")
    const candles = this.props.candles.map(candle => (
      <Candle key={"candle" + candle.date} candleData={candle} />
    ))
    const trendlines = <Trendlines trendlines={this.props.trendlines} />
    
    let selectedCandle = []
    let candleInfo = ""
    if (this.props.selected) {
      candleInfo = this.props.selected.low
      selectedCandle = <Selected 
      key={"selected" + this.props.selected.date} 
      candleData={this.props.selected} screenHeight={height}/>
    } 
    
    return (
      <View style={styles.containerStyle} {...this._panResponder.panHandlers}>
        <Text>{candleInfo}</Text>
        <ART.Surface width={width} height={height}>
          {candles}
          {trendlines} 
          {selectedCandle}
        </ART.Surface>

      </View>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
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
  return {
    candles: state.chartState.candles,
    trendlines: state.chartState.trendlines,
    loading: state.chartState.loading,
    span: state.chartState.span,
    selected: state.chartState.selected
  }
}

export default connect(
  mapStateToProps,
  {
    zoomChart,
    fetchChart,
    addTrendline,
    moveChart,
    candleInfo
  }
)(Chart)
