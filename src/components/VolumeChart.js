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
import { Sizing } from "./../utils/DiplayUtils"
import { zoomChart, moveChart, select } from "../actions"

class VolumeChart extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    render() {
        return (<Text>{'ddddd'}</Text>)
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