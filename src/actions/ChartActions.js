import candles from "./../../res/Chart.json";
import CoordsConverter from "./../engine/CoordsConverter";
import { Dimensions } from "react-native";

import {
    ZOOM_CHART,
    FETCH_CHART_SUCCESS,
    ADD_TRENDLINE
} from './types';

export const zoomChart = (candleCount) => {
  return {
    type: ZOOM_CHART,
    payload: candleCount
  };
};

export const fetchChart = () => {
  let { height, width } = Dimensions.get("window");
  const coordsConverter = new CoordsConverter(candles, width, height) 
  return {
    type: FETCH_CHART_SUCCESS,
    payload: coordsConverter
  };
};

  export const addTrendline = (_x,_y) => {
    return {
      type: ADD_TRENDLINE,
      payload: {x: _x, y: _y}
    };
};
