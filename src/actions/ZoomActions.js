import data from "./../../res/Chart.json";

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
  return {
    type: FETCH_CHART_SUCCESS,
    payload: data
  };
};
