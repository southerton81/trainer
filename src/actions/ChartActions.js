import candles from "./../../res/Chart.json";
import CoordsConverter from "./../engine/CoordsConverter";
import { Dimensions } from "react-native";

import {
    ZOOM_CHART,
    FETCH_CHART_SUCCESS
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

  export const addTrendline = (x1, y1, x2, y2) => {
    return {
      type: ADD_TRENDLINE,
      payload: {coords: [x1,y1,x2,y2]}
    };
};
