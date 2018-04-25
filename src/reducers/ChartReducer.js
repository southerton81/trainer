import { ZOOM_CHART, FETCH_CHART_SUCCESS } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ZOOM_CHART:
      return state.slice(0, action.payload);
    case FETCH_CHART_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
