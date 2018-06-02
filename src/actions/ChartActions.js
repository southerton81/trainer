import candles from "./../../res/Chart.json"
import CoordsConverter from "./../engine/CoordsConverter"
import { Dimensions } from "react-native"

import { ZOOM_CHART, FETCH_CHART_SUCCESS, ADD_TRENDLINE } from "./types"
import { Trendlines } from "../shapes/Trendlines";
import DecoratorsProcessor from "../engine/DecoratorsProcessor";

console.log('2')
 
var coordsConverter 
const decoratorsProcessor = new DecoratorsProcessor()

export const zoomChart = candleCount => {
  return {
    type: ZOOM_CHART,
    payload: candleCount
  }
}

export const fetchChart = () => {
  return function (dispatch) {
    requestAnimationFrame(() => {
      let { height, width } = Dimensions.get("window")
      coordsConverter = new CoordsConverter(candles, width, height)
      dispatch( {
        type: FETCH_CHART_SUCCESS,
        payload: coordsConverter.getScreenCandles()
      })
    })
  }
}

export const addTrendline = (scrX, scrY) => { 
  let chartPoint = coordsConverter.convertScreenToChart(scrX, scrY)
  decoratorsProcessor.addTrendline(chartPoint.x, chartPoint.y)
  return {
    type: ADD_TRENDLINE,
    payload: decoratorsProcessor.getScreenTrendlines(coordsConverter)
  }
}
