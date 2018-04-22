import {
    ZOOM_CHART
} from './types';

export const zoomChart = (candleCount) => {
  return {
    type: ZOOM_CHART,
    payload: candleCount
  };
};
