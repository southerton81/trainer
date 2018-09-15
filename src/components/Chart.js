import React, { Component } from "react"
import { connect } from "react-redux"
import {
  Animated,
  PanResponder,
  ART,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Text,
  Dimensions
} from "react-native"
import { Button } from "./common"
import { Candle } from "./../shapes/Candle"
import { Trendlines } from "./../shapes/Trendlines"
import { Selected } from "./../shapes/Selected"
import VolumeChart from "./VolumeChart"
import {
  zoomChart,
  fetchChart,
  addTrendline,
  moveChart,
  select
} from "../actions"

class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = { dimensions: { width: 0, height: 0 } }
  }

  componentWillMount() {
    this.setupPanResponder()
  }

  onLayout = e => {
    console.log('onLayout')

    if (!this.state.dimensions ||
      this.state.dimensions.width !== e.nativeEvent.layout.width ||
      this.state.dimensions.height !== e.nativeEvent.layout.height) {
      this.setState({
        dimensions: e.nativeEvent.layout
      })


      console.log('fetchChart')
      this.props.fetchChart(e.nativeEvent.layout.width, e.nativeEvent.layout.height)
    }
  }

  setupPanResponder() {
    this.pan = { x: 0, y: 0 }
    this.moveDiff = 0
    this.totalMoveDiff = 0 // Used for click recognition
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.pan = { x: e.nativeEvent.locationX, y: e.nativeEvent.locationY }
        this.moveDiff = 0
        this.totalMoveDiff = 0
      },

      onPanResponderMove: (e, gestureState) => {
        let diff = e.nativeEvent.locationX - this.pan.x
        this.pan = { x: e.nativeEvent.locationX, y: e.nativeEvent.locationY }
        if (e.nativeEvent.touches.length <= 1) {
          this.props.moveChart(-diff)
          this.totalMoveDiff += Math.abs(diff)
        } else {
          let diff =
            e.nativeEvent.touches[0].locationX -
            e.nativeEvent.touches[1].locationX
          if (this.moveDiff > 0) {
            this.props.zoomChart(this.moveDiff - diff)
            this.totalMoveDiff = 1000
          }
          this.moveDiff = diff
        }
      },

      onPanResponderRelease: (e, { vx, vy }) => {
        if (this.totalMoveDiff < 5)
          this.props.select(e.nativeEvent.locationX, e.nativeEvent.locationY)
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
    if (this.props.loading) {
      return (
        <View style={{ flex: 3,  justifyContent:'center' }} onLayout={this.onLayout}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    let { height, width } = this.state.dimensions
    const candles = this.props.candles.map(candle => (
      <Candle key={"candle" + candle.date} candleData={candle} />
    ))
    const trendlines = <Trendlines trendlines={this.props.trendlines} />

    let selected = []
    let candleInfo = ""
    if (this.props.selected) {
      candleInfo = this.props.candleInfo
      selected = (
        <Selected
          key={"selected" + this.props.selected}
          pos={this.props.selected}
          screenHeight={height}
        />
      )
    }

    return (
      <View style={{ flex: 3 }}
        {...this._panResponder.panHandlers}>

        <ART.Surface width={width} height={height}>
          {candles}
          {selected}
          {trendlines}

          <ART.Text
            font={`13px "Helvetica Neue", "Helvetica", Arial`}
            fill="#000000"
            alignment="left">
            {candleInfo}
          </ART.Text>
        </ART.Surface>
      </View>
    )
  }
} 

const mapStateToProps = state => {
  return {
    candles: state.chartState.candles,
    trendlines: state.chartState.trendlines,
    loading: state.chartState.loading,
    selected: state.chartState.selected,
    candleInfo: state.chartState.candleInfo
  }
}

export default connect(
  mapStateToProps,
  {
    zoomChart,
    fetchChart,
    addTrendline,
    moveChart,
    select
  }
)(Chart)
