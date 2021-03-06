import candles from "./../../res/Chart.json"
import CoordsConverter from "./../engine/CoordsConverter" 

import {
  ZOOM_CHART,
  FETCH_CHART_SUCCESS,
  ADD_TRENDLINE,
  FETCH_CHART_START,
  MOVE_CHART,
  CANDLE_INFO,
  SELECT
} from "./types" 
import DecoratorsProcessor from "../engine/DecoratorsProcessor" 

let coordsConverter
const decoratorsProcessor = new DecoratorsProcessor()

export const fetchChart = (w, h) => {
  return dispatch => {
    dispatch({ type: FETCH_CHART_START })
    requestAnimationFrame(() => { 
      coordsConverter = new CoordsConverter(candles, w, h)
      dispatch({
        type: FETCH_CHART_SUCCESS,
        payload: {
          candles: coordsConverter.getScreenCandles(coordsConverter),
          selected: decoratorsProcessor.getScreenSelection(coordsConverter)
        }
      })
    })
  }
}

export const moveChart = dx => {
  if (coordsConverter) {
    coordsConverter.moveChartRc(dx)
    return {
      type: FETCH_CHART_SUCCESS,
      payload: {
        candles: coordsConverter.getScreenCandles(coordsConverter),
        selected: decoratorsProcessor.getScreenSelection(coordsConverter)
      }
    }
  }
}

export const zoomChart = dx => {
  coordsConverter.zoomChartRc(dx)
  return {
    type: FETCH_CHART_SUCCESS,
    payload: {
      candles: coordsConverter.getScreenCandles(coordsConverter),
      selected: decoratorsProcessor.getScreenSelection(coordsConverter)
    }
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

export const select = (x, y) => {
  let chartPoint = coordsConverter.convertScreenToChartCandleCenter(x, y)
  decoratorsProcessor.setSelection(chartPoint.x, chartPoint.y)
  if (coordsConverter) {
    return {
      type: SELECT,
      payload: {
        selected: decoratorsProcessor.getScreenSelection(coordsConverter),
        candleInfo: coordsConverter.getCandleAtScreenPoint(x).low
      }
    }
  }
}




