import data from "./../../res/Chart.json";
import { ZOOM_CHART } from "../actions/types";

const INITIAL_STATE = data;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ZOOM_CHART:
      return data.slice(0, action.payload);
    default:
      return state;
  }
};
