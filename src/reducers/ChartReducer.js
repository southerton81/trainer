import {
  ZOOM_CHART,
  FETCH_CHART_SUCCESS,
  ADD_TRENDLINE,
  FETCH_CHART_START,
  CANDLE_INFO,
  SELECT
} from "../actions/types"

const INITIAL_STATE = {
  candles: [],
  trendlines: [], 
  loading: true
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ZOOM_CHART:
      return INITIAL_STATE
    case FETCH_CHART_SUCCESS:
      return { ...state, candles: action.payload.candles, selected: action.payload.selected, loading: false }
    case FETCH_CHART_START:
      return { ...state, loading: true }
    case ADD_TRENDLINE:
      return { ...state, trendlines: action.payload }
    case SELECT:
      return { ...state, selected: action.payload.selected, candleInfo: action.payload.candleInfo }
    default:
      return INITIAL_STATE
  }
}
