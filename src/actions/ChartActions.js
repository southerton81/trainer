import candles from "./../../res/Chart.json"
import CoordsConverter from "./../engine/CoordsConverter"
import { Dimensions } from "react-native"

import {
  ZOOM_CHART,
  FETCH_CHART_SUCCESS,
  ADD_TRENDLINE,
  FETCH_CHART_START,
  MOVE_CHART,
  CANDLE_INFO
} from "./types"
import { Trendlines } from "../shapes/Trendlines"
import DecoratorsProcessor from "../engine/DecoratorsProcessor"

var coordsConverter
const decoratorsProcessor = new DecoratorsProcessor()

export const fetchChart = () => {
  return dispatch => {
    dispatch({ type: FETCH_CHART_START })
    requestAnimationFrame(() => {
      let { height, width } = Dimensions.get("window")
      coordsConverter = new CoordsConverter(candles, width, height)
      dispatch({
        type: FETCH_CHART_SUCCESS,
        payload: coordsConverter.getScreenCandles()
      })
    })
  }
}

export const moveChart = dx => {
  if (coordsConverter) {
    coordsConverter.moveChartRc(dx)
    return {
      type: FETCH_CHART_SUCCESS,
      payload: coordsConverter.getScreenCandles(coordsConverter) 
    }
  }
}
 
export const zoomChart = dx => {
  coordsConverter.zoomChartRc(dx)
  return {
    type: FETCH_CHART_SUCCESS,
    payload: coordsConverter.getScreenCandles(coordsConverter)
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

export const candleInfo = (x) => {
  if (coordsConverter) { 
    return {
      type: CANDLE_INFO,
      payload: coordsConverter.getCandleAtScreenPoint(x)
    }
  }
}
