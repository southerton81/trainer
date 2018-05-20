import { ZOOM_CHART, FETCH_CHART_SUCCESS, ADD_TRENDLINE } from "../actions/types";

const INITIAL_STATE = {
  coordsConverter: null,
  trendlines: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ZOOM_CHART:
      return INITIAL_STATE
    case FETCH_CHART_SUCCESS: 
      return { ...state, coordsConverter: action.payload };
    case ADD_TRENDLINE:
      let newTrendlines = [ ...state.trendlines, action.payload ]
      return { ...state, trendlines: newTrendlines }
    default:
      return INITIAL_STATE;
  }
};
