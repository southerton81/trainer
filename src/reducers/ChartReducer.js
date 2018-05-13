import { ZOOM_CHART, FETCH_CHART_SUCCESS } from "../actions/types";

const INITIAL_STATE = {
  coordsConverter: null,
  decorations: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ZOOM_CHART:
      return INITIAL_STATE
    case FETCH_CHART_SUCCESS: 
      return { ...state, coordsConverter: action.payload };
    case ADD_TRENDLINE:
      let newDecorations = [ ...state.decorations, action.payload ]
      return { ...state, decorations: newDecorations }
    default:
      return INITIAL_STATE;
  }
};
