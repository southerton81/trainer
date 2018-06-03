import {
  ZOOM_CHART,
  FETCH_CHART_SUCCESS,
  ADD_TRENDLINE,
  FETCH_CHART_START
} from "../actions/types"

const INITIAL_STATE = {
  candles: [],
  trendlines: [],
  loading: false
}

export default (state = INITIAL_STATE, action) => {
  console.log('0' + action.type)
  switch (action.type) {
    case ZOOM_CHART:
      return INITIAL_STATE
    case FETCH_CHART_SUCCESS:
      return { ...state, candles: action.payload, loading: false }
    case FETCH_CHART_START:
      return { ...state, loading: true }
    case ADD_TRENDLINE:
      return { ...state, trendlines: action.payload }
    default:
      return INITIAL_STATE
  }
}
