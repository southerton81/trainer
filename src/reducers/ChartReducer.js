import { ZOOM_CHART, FETCH_CHART_SUCCESS, ADD_TRENDLINE } from "../actions/types";

const INITIAL_STATE = {
  candles: null,
  trendlines: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ZOOM_CHART:
      return INITIAL_STATE
    case FETCH_CHART_SUCCESS: 
      return { ...state, candles: action.payload };
    case ADD_TRENDLINE:
      return { ...state, trendlines: action.payload }
    default:
      return INITIAL_STATE;
  }
};
