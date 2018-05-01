import candles from "./../../res/Chart.json";
import CoordsConverter from "./../engine/CoordsConverter";

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

  const coordsConverter = new CoordsConverter(candles)


  return {
    type: FETCH_CHART_SUCCESS,
    payload: candles
  };
};
